import fs from 'fs/promises'
import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
if (!stripeSecretKey) {
  console.error('Missing STRIPE_SECRET_KEY. Set it in your environment first.')
  process.exit(1)
}

const baseUrl =
  process.env.WEBHOOK_BASE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'http://localhost:3000'

const webhookUrl = `${baseUrl.replace(/\/$/, '')}/api/webhooks/stripe`

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-12-18-ac',
  typescript: true,
})

const endpoint = await stripe.webhookEndpoints.create({
  url: webhookUrl,
  enabled_events: ['checkout.session.completed', 'invoice.payment_succeeded'],
})

const envFile = process.env.ENV_FILE || '.env'
const envKey = 'STRIPE_WEBHOOK_SECRET'
const envValue = endpoint.secret

try {
  const existing = await fs.readFile(envFile, 'utf8')
  const lines = existing.split('\n')
  const updated = lines.some((line) => line.startsWith(`${envKey}=`))
    ? lines
        .map((line) =>
          line.startsWith(`${envKey}=`) ? `${envKey}="${envValue}"` : line
        )
        .join('\n')
    : `${existing.replace(/\n?$/, '\n')}${envKey}="${envValue}"\n`
  await fs.writeFile(envFile, updated)
} catch (error) {
  await fs.writeFile(envFile, `${envKey}="${envValue}"\n`)
}

console.log('Stripe webhook endpoint created:', endpoint.id)
console.log(`Webhook URL: ${webhookUrl}`)
console.log(`Updated ${envFile} with ${envKey}.`)
