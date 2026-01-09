"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    // Simple logout by clearing the cookie (client-side)
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push('/login')
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="PromptPerfect Logo" width={32} height={32} />
          <span className="text-xl font-bold tracking-tight">PromptPerfect</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            Analyze
          </Link>
          <Link href="/history" className="text-sm font-medium transition-colors hover:text-primary">
            History
          </Link>
          <Link href="/settings" className="text-sm font-medium transition-colors hover:text-primary">
            Settings
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}
