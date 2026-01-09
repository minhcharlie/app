"use client"

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Trash2, ChevronRight, Calendar, Clock, Split, FileText } from 'lucide-react'
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
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F]">
      <Navbar />
      <main className="container max-w-5xl py-12 px-6">
        <div className="mb-12 space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">History</h1>
          <p className="text-lg text-slate-500 font-medium">Review and manage your past evaluations.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">Loading your history...</p>
          </div>
        ) : history.length === 0 ? (
          <Card className="p-20 text-center border-none shadow-sm bg-white/50 backdrop-blur-sm rounded-3xl">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No history yet</h3>
            <p className="text-slate-500 mb-6">Start by analyzing your first prompt in the lab.</p>
            <Button asChild className="rounded-full px-8">
              <a href="/dashboard">Go to Lab</a>
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4">
            {history.map((item) => (
              <Card key={item.id} className="group border-none shadow-sm bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden transition-all hover:shadow-md hover:bg-white">
                <div className="flex items-center justify-between p-6">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {format(new Date(item.createdAt), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {format(new Date(item.createdAt), 'p')}
                      </div>
                      {item.mode === 'ab' && (
                        <Badge variant="outline" className="rounded-full bg-blue-50 text-blue-600 border-blue-100 px-2 py-0 text-[10px]">
                          A/B Test
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold line-clamp-1 pr-8">{item.promptText}</h3>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        <span className="text-xs font-medium text-slate-600">Clarity: {item.clarityScore}%</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-xs font-medium text-slate-600">Relevance: {item.relevanceScore}%</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-violet-500" />
                        <span className="text-xs font-medium text-slate-600">Coherence: {item.coherenceScore}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="rounded-full px-4 hover:bg-slate-100">
                          Details
                          <ChevronRight className="ml-1.5 h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-[2rem] border-none shadow-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold">Evaluation Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-8 py-6">
                          <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Original Prompt</h4>
                            <div className="rounded-2xl bg-slate-50 p-6 text-sm text-slate-700 border border-slate-100 leading-relaxed">
                              {item.promptText}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4">
                            {[
                              { label: 'Clarity', score: item.clarityScore, color: 'text-blue-600', bg: 'bg-blue-50' },
                              { label: 'Relevance', score: item.relevanceScore, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                              { label: 'Coherence', score: item.coherenceScore, color: 'text-violet-600', bg: 'bg-violet-50' }
                            ].map((stat) => (
                              <div key={stat.label} className={`text-center p-4 rounded-2xl ${stat.bg} border border-white shadow-sm`}>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{stat.label}</div>
                                <div className={`text-3xl font-bold ${stat.color}`}>{stat.score}%</div>
                              </div>
                            ))}
                          </div>

                          {item.customScores && Object.keys(item.customScores).length > 0 && (
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Custom Criteria</h4>
                              <div className="grid gap-3">
                                {Object.entries(item.customScores).map(([key, value]: [string, any]) => (
                                  <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <span className="text-sm font-medium text-slate-700">{key}</span>
                                    <span className="text-sm font-bold text-slate-900">{value}%</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Improved Version</h4>
                            <div className="rounded-2xl bg-slate-900 p-6 text-sm text-slate-300 italic leading-relaxed shadow-xl">
                              {item.rewrittenPrompt}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-9 w-9 rounded-full text-slate-300 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all" 
                      onClick={() => handleDelete(item.id)}
                    >
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
