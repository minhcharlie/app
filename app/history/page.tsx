"use client"

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Trash2, ChevronRight, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history')
      const data = await res.json()
      if (res.ok) {
        setHistory(data)
      }
    } catch (error) {
      toast.error('Failed to load history')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/history/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setHistory(history.filter((item) => item.id !== id))
        toast.success('Entry deleted')
      }
    } catch (error) {
      toast.error('Failed to delete entry')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Analysis History</h1>
          <p className="text-muted-foreground">View and manage your previous prompt evaluations.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : history.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No history found. Start by analyzing a prompt!</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {history.map((item) => (
              <Card key={item.id} className="overflow-hidden transition-shadow hover:shadow-md">
                <div className="flex items-center justify-between p-6">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(item.createdAt), 'PPP p')}
                    </div>
                    <h3 className="font-semibold line-clamp-1">{item.promptText}</h3>
                    <div className="flex gap-2">
                      <Badge variant="secondary">Clarity: {item.clarityScore}%</Badge>
                      <Badge variant="secondary">Relevance: {item.relevanceScore}%</Badge>
                      <Badge variant="secondary">Coherence: {item.coherenceScore}%</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          View Details
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Analysis Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold">Original Prompt</h4>
                            <div className="rounded-md bg-slate-50 p-3 text-sm border">{item.promptText}</div>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-3 rounded-md bg-blue-50 border border-blue-100">
                              <div className="text-xs text-blue-600 font-medium uppercase">Clarity</div>
                              <div className="text-2xl font-bold text-blue-700">{item.clarityScore}%</div>
                            </div>
                            <div className="text-center p-3 rounded-md bg-green-50 border border-green-100">
                              <div className="text-xs text-green-600 font-medium uppercase">Relevance</div>
                              <div className="text-2xl font-bold text-green-700">{item.relevanceScore}%</div>
                            </div>
                            <div className="text-center p-3 rounded-md bg-purple-50 border border-purple-100">
                              <div className="text-xs text-purple-600 font-medium uppercase">Coherence</div>
                              <div className="text-2xl font-bold text-purple-700">{item.coherenceScore}%</div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold">Rewritten Prompt</h4>
                            <div className="rounded-md bg-slate-100 p-3 text-sm italic border">{item.rewrittenPrompt}</div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
