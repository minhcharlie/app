"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Sparkles, FileText, Calendar, User } from 'lucide-react'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

export default function PublicSharePage() {
  const { id } = useParams()
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPublicAnalysis = async () => {
      try {
        const res = await fetch(`/api/public/analysis/${id}`)
        const data = await res.json()
        if (res.ok) {
          setAnalysis(data)
        } else {
          setError(data.error || 'Analysis not found')
        }
      } catch (err) {
        setError('Failed to load analysis')
      } finally {
        setLoading(false)
      }
    }
    fetchPublicAnalysis()
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FBFBFD] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-slate-500 font-medium">Loading shared analysis...</p>
      </div>
    )
  }

  if (error || !analysis) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FBFBFD] px-6 text-center">
        <div className="h-16 w-16 rounded-3xl bg-red-50 flex items-center justify-center mb-6">
          <FileText className="h-8 w-8 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Analysis Unavailable</h1>
        <p className="text-slate-500 max-w-md mb-8">{error || 'This analysis is private or does not exist.'}</p>
        <Link href="/" className="text-primary font-semibold hover:underline">Go to PromptPerfect</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] pb-20">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container max-w-4xl flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="bg-primary rounded-lg p-1.5">
              <Image src="/images/logo.png" alt="Logo" width={20} height={20} className="invert" />
            </div>
            <span className="text-lg font-bold tracking-tight">PromptPerfect</span>
          </Link>
          <Badge variant="secondary" className="rounded-full bg-slate-100 text-slate-600 border-none px-4 py-1">
            Shared Analysis
          </Badge>
        </div>
      </header>

      <main className="container max-w-4xl py-12 px-6 space-y-10">
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {format(new Date(analysis.createdAt), 'MMM d, yyyy')}
            </div>
            <div className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              By {analysis.user?.username || 'Anonymous'}
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight leading-tight">
            Prompt Evaluation Report
          </h1>
        </div>

        <Card className="border-none shadow-sm bg-white rounded-[2rem] overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Original Prompt</CardTitle>
            <div className="text-lg text-slate-700 leading-relaxed font-medium">
              "{analysis.promptText}"
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-10">
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'Clarity', score: analysis.clarityScore, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Relevance', score: analysis.relevanceScore, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Coherence', score: analysis.coherenceScore, color: 'text-violet-600', bg: 'bg-violet-50' }
              ].map((stat) => (
                <div key={stat.label} className={`text-center p-6 rounded-3xl ${stat.bg} border border-white shadow-sm`}>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{stat.label}</div>
                  <div className={`text-4xl font-bold ${stat.color}`}>{stat.score}%</div>
                </div>
              ))}
            </div>

            {analysis.customScores && Object.keys(analysis.customScores).length > 0 && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Custom Criteria</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  {Object.entries(analysis.customScores).map(([key, value]: [string, any]) => (
                    <div key={key} className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="font-semibold text-slate-700">{key}</span>
                      <span className="text-lg font-bold text-slate-900">{value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Improvement Suggestions</h4>
              <ul className="grid gap-3">
                {analysis.suggestions.map((s: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50/50 text-slate-600 leading-relaxed border border-slate-100">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Improved Version
              </h4>
              <div className="rounded-3xl bg-slate-900 p-8 text-base text-slate-300 italic leading-relaxed shadow-2xl">
                {analysis.rewrittenPrompt}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center pt-10">
          <p className="text-slate-400 text-sm mb-6">Want to perfect your own prompts?</p>
          <Button asChild size="lg" className="rounded-full px-10 h-14 text-lg font-semibold shadow-xl shadow-primary/20">
            <Link href="/signup">Get Started with PromptPerfect</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
