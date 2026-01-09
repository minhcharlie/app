"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { toast } from 'sonner'
import Image from 'next/image'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success('Account created! Please login.')
        router.push('/login')
      } else {
        toast.error(data.error || 'Signup failed')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBFBFD] px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="bg-primary rounded-2xl p-3 shadow-xl shadow-primary/20">
            <Image src="/images/logo.png" alt="Logo" width={32} height={32} className="invert" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Create account</h1>
          <p className="text-slate-500 font-medium">Join the lab and start perfecting your prompts.</p>
        </div>

        <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2rem] overflow-hidden">
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Username</label>
                <Input
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Email</label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-6 pb-8">
              <Button className="w-full h-12 rounded-xl text-base font-semibold shadow-lg shadow-primary/10" type="submit" disabled={loading}>
                {loading ? 'Creating account...' : 'Sign up'}
              </Button>
              <p className="text-center text-sm text-slate-500">
                Already have an account?{' '}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
