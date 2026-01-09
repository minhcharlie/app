import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] font-sans py-20 px-6">
      <div className="container max-w-3xl mx-auto space-y-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-xl text-[#86868B] font-medium">Simple rules for a professional environment.</p>
        <div className="text-left space-y-6 pt-10 border-t border-[#D2D2D7]/30">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Acceptance of Terms</h2>
            <p className="text-[#86868B] leading-relaxed">By using PromptScore, you agree to these terms. Please read them carefully.</p>
          </section>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">User Conduct</h2>
            <p className="text-[#86868B] leading-relaxed">You are responsible for the content you submit. Do not use the service for illegal or harmful activities.</p>
          </section>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Subscription</h2>
            <p className="text-[#86868B] leading-relaxed">Billing is handled through Stripe. You can cancel your subscription at any time through your account settings.</p>
          </section>
        </div>
        <div className="pt-10">
          <Link href="/" className="text-[#0071E3] font-semibold hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
