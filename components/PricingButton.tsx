"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function PricingButton({ priceId, children, className }: { priceId: string, children: React.ReactNode, className?: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ priceId }),
      })

      const data = await res.json()

      if (res.ok) {
        window.location.href = data.url
      } else {
        if (res.status === 401) {
          toast.error('Please login to subscribe')
          router.push('/login')
        } else {
          toast.error(data.error || 'Checkout failed')
        }
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      className={className} 
      onClick={handleCheckout} 
      disabled={loading}
    >
      {loading ? 'Redirecting...' : children}
    </Button>
  )
}
