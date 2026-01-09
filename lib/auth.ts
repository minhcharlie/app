import { jwtVerify } from 'jose'
import { cookies, headers } from 'next/headers'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function getAuthUser() {
  try {
    const cookieStore = await cookies()
    let token = cookieStore.get('token')?.value

    if (!token) {
      const headerList = await headers()
      const authHeader = headerList.get('authorization')
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7)
      }
    }

    if (!token) return null

    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as { userId: string; email: string }
  } catch (error) {
    console.error('Auth verification failed:', error)
    return null
  }
}
