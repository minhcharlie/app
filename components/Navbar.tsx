"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push('/login')
  }

  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'History', href: '/history' },
    { label: 'Settings', href: '/settings' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container max-w-7xl flex h-16 items-center justify-between px-6">
        <Link href="/dashboard" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <div className="bg-primary rounded-lg p-1.5">
            <Image src="/images/logo.png" alt="Logo" width={20} height={20} className="invert" />
          </div>
          <span className="text-lg font-bold tracking-tight">PromptScore</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-all",
                pathname === item.href 
                  ? "bg-slate-100 text-slate-900" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full px-4">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}
