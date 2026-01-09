"use client"

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { CheckCircle2, Sparkles, Save } from 'lucide-react'

export default function DashboardPage() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [saving, setSaving] = useState(false)

  const handleAnalyze = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      if (res.ok) {
        setAnalysis(data)
      } else {
        toast.error(data.error || 'Analysis failed')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!analysis) return
    setSaving(true)
    try {
      const res = await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptText: prompt,
          clarityScore: analysis.clarityScore,
          relevanceScore: analysis.relevanceScore,
          coherenceScore: analysis.coherenceScore,
          suggestions: analysis.suggestions,
          rewrittenPrompt: analysis.rewrittenPrompt,
        }),
      })
      if (res.ok) {
        toast.success('Analysis saved to history')
      } else {
        toast.error('Failed to save analysis')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="container py-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analyze your prompt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your prompt here..."
                  className="min-h-[300px] resize-none"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <Button className="w-full" onClick={handleAnalyze} disabled={loading || !prompt.trim()}>
                  {loading ? 'Analyzing...' : 'Submit for analysis'}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {analysis ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Analysis Results
                      <Button variant="outline" size="sm" onClick={handleSave} disabled={saving}>
                        <Save className="mr-2 h-4 w-4" />
                        {saving ? 'Saving...' : 'Save analysis'}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Clarity</span>
                          <span>{analysis.clarityScore}%</span>
                        </div>
                        <Progress value={analysis.clarityScore} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Relevance</span>
                          <span>{analysis.relevanceScore}%</span>
                        </div>
                        <Progress value={analysis.relevanceScore} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Coherence</span>
                          <span>{analysis.coherenceScore}%</span>
                        </div>
                        <Progress value={analysis.coherenceScore} className="h-2" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold">Improvement Suggestions</h4>
                      <ul className="space-y-2">
                        {analysis.suggestions.map((s: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-blue-500" />
                        Rewritten Prompt
                      </h4>
                      <div className="rounded-lg bg-slate-100 p-4 text-sm italic text-slate-700 border border-slate-200">
                        {analysis.rewrittenPrompt}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed p-12 text-center text-muted-foreground">
                Submit a prompt to see the analysis results here.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
