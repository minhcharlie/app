"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import { toast } from 'sonner'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) { localStorage.setItem("token", data.token);
        toast.success('Welcome back')
        router.push('/dashboard')
      } else {
        toast.error(data.error || 'Login failed')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#1D1D1F] font-sans">
      <nav className="flex h-12 items-center justify-between px-6 border-b border-[#D2D2D7]/30">
        <Link href="/" className="text-lg font-bold tracking-tight">PromptScore</Link>
      </nav>

      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="w-full max-w-[400px] space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Sign in.</h1>
            <p className="text-lg text-[#86868B] font-medium">Enter your details to access the lab.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#86868B] ml-1">Email</label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14 rounded-2xl border-[#D2D2D7] bg-[#F5F5F7]/50 focus:bg-white focus:ring-[#0071E3]/20 transition-all text-lg px-5"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#86868B] ml-1">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-14 rounded-2xl border-[#D2D2D7] bg-[#F5F5F7]/50 focus:bg-white focus:ring-[#0071E3]/20 transition-all text-lg px-5"
                />
              </div>
            </div>

            <Button className="w-full h-14 rounded-full bg-[#0071E3] text-lg font-semibold hover:bg-[#0077ED] shadow-xl shadow-blue-500/10" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="text-center pt-4">
              <p className="text-[#86868B] font-medium">
                New to PromptScore?{' '}
                <Link href="/signup" className="text-[#0071E3] hover:underline">
                  Create your account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>

      <footer className="py-12 border-t border-[#D2D2D7]/30 bg-[#F5F5F7]">
        <div className="container max-w-[1200px] px-6 text-center text-xs text-[#86868B] font-medium">
          <p>© 2026 PromptScore Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
