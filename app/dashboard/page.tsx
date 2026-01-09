"use client"

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { CheckCircle2, Sparkles, Save, Plus, X, Split, FileText, Share2, Download, Copy } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function DashboardPage() {
  const [mode, setMode] = useState<'single' | 'ab'>('single')
  const [promptA, setPromptA] = useState('')
  const [promptB, setPromptB] = useState('')
  const [customCriteria, setCustomCriteria] = useState<string[]>([])
  const [newCriterion, setNewCriterion] = useState('')
  const [loadingA, setLoadingA] = useState(false)
  const [loadingB, setLoadingB] = useState(false)
  const [analysisA, setAnalysisA] = useState<any>(null)
  const [analysisB, setAnalysisB] = useState<any>(null)
  const [savedIdA, setSavedIdA] = useState<string | null>(null)
  const [savedIdB, setSavedIdB] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const handleAddCriterion = () => {
    if (newCriterion.trim() && !customCriteria.includes(newCriterion.trim())) {
      setCustomCriteria([...customCriteria, newCriterion.trim()])
      setNewCriterion('')
    }
  }

  const handleRemoveCriterion = (index: number) => {
    setCustomCriteria(customCriteria.filter((_, i) => i !== index))
  }

  const handleAnalyze = async (target: 'A' | 'B') => {
    const prompt = target === 'A' ? promptA : promptB
    if (!prompt.trim()) return
    
    if (target === 'A') {
      setLoadingA(true)
      setSavedIdA(null)
    } else {
      setLoadingB(true)
      setSavedIdB(null)
    }

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, customCriteria }),
      })
      const data = await res.json()
      if (res.ok) {
        if (target === 'A') setAnalysisA(data)
        else setAnalysisB(data)
      } else {
        toast.error(data.error || 'Analysis failed')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      if (target === 'A') setLoadingA(false)
      else setLoadingB(false)
    }
  }

  const handleSave = async (target: 'A' | 'B') => {
    const analysis = target === 'A' ? analysisA : analysisB
    const prompt = target === 'A' ? promptA : promptB
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
          customScores: analysis.customScores || {},
          suggestions: analysis.suggestions,
          rewrittenPrompt: analysis.rewrittenPrompt,
          mode: mode,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success('Analysis saved to history')
        if (target === 'A') setSavedIdA(data.id)
        else setSavedIdB(data.id)
      } else {
        toast.error('Failed to save analysis')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setSaving(false)
    }
  }

  const handleExport = (analysis: any, prompt: string) => {
    const content = `# PromptPerfect Evaluation Report

## Original Prompt
${prompt}

## Scores
- Clarity: ${analysis.clarityScore}%
- Relevance: ${analysis.relevanceScore}%
- Coherence: ${analysis.coherenceScore}%
${Object.entries(analysis.customScores || {}).map(([k, v]) => `- ${k}: ${v}%`).join('\n')}

## Suggestions
${analysis.suggestions.map((s: string) => `- ${s}`).join('\n')}

## Improved Version
${analysis.rewrittenPrompt}
`;
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'prompt-analysis.md'
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Report exported as Markdown')
  }

  const handleShare = async (id: string) => {
    try {
      const res = await fetch(`/api/history/${id}/share`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublic: true }),
      })
      if (res.ok) {
        const shareUrl = `${window.location.origin}/share/${id}`
        await navigator.clipboard.writeText(shareUrl)
        toast.success('Share link copied to clipboard!')
      }
    } catch (error) {
      toast.error('Failed to generate share link')
    }
  }

  const AnalysisCard = ({ analysis, target, loading, savedId, prompt }: { analysis: any, target: 'A' | 'B', loading: boolean, savedId: string | null, prompt: string }) => (
    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm rounded-3xl overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Analysis {mode === 'ab' ? target : ''}</CardTitle>
          <div className="flex items-center gap-1">
            {analysis && (
              <>
                <Button variant="ghost" size="icon" onClick={() => handleExport(analysis, prompt)} className="h-8 w-8 rounded-full">
                  <Download className="h-4 w-4" />
                </Button>
                {savedId ? (
                  <Button variant="ghost" size="icon" onClick={() => handleShare(savedId)} className="h-8 w-8 rounded-full text-primary">
                    <Share2 className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={() => handleSave(target)} disabled={saving} className="h-8 px-3 text-xs rounded-full">
                    <Save className="mr-1.5 h-3.5 w-3.5" />
                    Save
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">AI is evaluating your prompt...</p>
          </div>
        ) : analysis ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Clarity', score: analysis.clarityScore, color: 'bg-blue-500' },
                { label: 'Relevance', score: analysis.relevanceScore, color: 'bg-emerald-500' },
                { label: 'Coherence', score: analysis.coherenceScore, color: 'bg-violet-500' }
              ].map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                    <span>{item.label}</span>
                    <span>{item.score}%</span>
                  </div>
                  <Progress value={item.score} className="h-1.5" />
                </div>
              ))}
            </div>

            {analysis.customScores && Object.keys(analysis.customScores).length > 0 && (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Custom Criteria</h4>
                <div className="grid gap-3">
                  {Object.entries(analysis.customScores).map(([key, value]: [string, any]) => (
                    <div key={key} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span>{key}</span>
                        <span>{value}%</span>
                      </div>
                      <Progress value={value} className="h-1" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Suggestions</h4>
              <ul className="space-y-2">
                {analysis.suggestions.map((s: string, i: number) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                Improved Version
              </h4>
              <div className="rounded-xl bg-slate-50/80 p-4 text-sm text-slate-700 border border-slate-100 leading-relaxed">
                {analysis.rewrittenPrompt}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
              <FileText className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-sm text-muted-foreground max-w-[200px]">
              Submit your prompt to see AI-powered insights here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F]">
      <Navbar />
      <main className="container max-w-7xl py-12 px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight">Prompt Lab</h1>
            <p className="text-lg text-slate-500 font-medium">Refine your AI interactions with precision.</p>
          </div>
          
          <div className="flex items-center bg-white rounded-full p-1 shadow-sm border border-slate-200">
            <Button 
              variant={mode === 'single' ? 'default' : 'ghost'} 
              size="sm" 
              className="rounded-full px-6 h-9"
              onClick={() => setMode('single')}
            >
              Single
            </Button>
            <Button 
              variant={mode === 'ab' ? 'default' : 'ghost'} 
              size="sm" 
              className="rounded-full px-6 h-9"
              onClick={() => setMode('ab')}
            >
              <Split className="mr-2 h-4 w-4" />
              A/B Test
            </Button>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
          <div className="space-y-8">
            <div className={mode === 'ab' ? 'grid md:grid-cols-2 gap-6' : 'space-y-6'}>
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <label className="text-sm font-bold uppercase tracking-widest text-slate-400">
                    {mode === 'ab' ? 'Prompt A' : 'Your Prompt'}
                  </label>
                </div>
                <Textarea
                  placeholder="Enter your prompt here..."
                  className="min-h-[300px] resize-none rounded-2xl border-slate-200 bg-white shadow-sm focus:ring-primary/20 transition-all text-base p-6"
                  value={promptA}
                  onChange={(e) => setPromptA(e.target.value)}
                />
                <Button 
                  className="w-full rounded-xl h-12 text-base font-semibold shadow-lg shadow-primary/10" 
                  onClick={() => handleAnalyze('A')} 
                  disabled={loadingA || !promptA.trim()}
                >
                  {loadingA ? 'Analyzing...' : 'Analyze Prompt'}
                </Button>
              </div>

              {mode === 'ab' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-sm font-bold uppercase tracking-widest text-slate-400">Prompt B</label>
                  </div>
                  <Textarea
                    placeholder="Enter alternative prompt..."
                    className="min-h-[300px] resize-none rounded-2xl border-slate-200 bg-white shadow-sm focus:ring-primary/20 transition-all text-base p-6"
                    value={promptB}
                    onChange={(e) => setPromptB(e.target.value)}
                  />
                  <Button 
                    className="w-full rounded-xl h-12 text-base font-semibold shadow-lg shadow-primary/10" 
                    onClick={() => handleAnalyze('B')} 
                    disabled={loadingB || !promptB.trim()}
                  >
                    {loadingB ? 'Analyzing...' : 'Analyze Prompt'}
                  </Button>
                </div>
              )}
            </div>

            {mode === 'ab' && (
              <div className="grid md:grid-cols-2 gap-6">
                <AnalysisCard analysis={analysisA} target="A" loading={loadingA} savedId={savedIdA} prompt={promptA} />
                <AnalysisCard analysis={analysisB} target="B" loading={loadingB} savedId={savedIdB} prompt={promptB} />
              </div>
            )}

            {mode === 'single' && (
              <AnalysisCard analysis={analysisA} target="A" loading={loadingA} savedId={savedIdA} prompt={promptA} />
            )}
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Custom Criteria</CardTitle>
                <CardDescription>Add specific metrics for the AI to evaluate.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="e.g. Tone, Brevity..." 
                    value={newCriterion}
                    onChange={(e) => setNewCriterion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCriterion()}
                    className="rounded-xl border-slate-200"
                  />
                  <Button size="icon" onClick={handleAddCriterion} className="rounded-xl shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {customCriteria.map((c, i) => (
                    <Badge key={i} variant="secondary" className="pl-3 pr-1 py-1.5 rounded-full bg-slate-100 text-slate-700 border-none flex items-center gap-1">
                      {c}
                      <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full hover:bg-slate-200" onClick={() => handleRemoveCriterion(i)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                  {customCriteria.length === 0 && (
                    <p className="text-xs text-muted-foreground italic">No custom criteria added yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-primary/5 rounded-2xl overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">Pro Tip</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Use custom criteria like "Professionalism" or "Technical Accuracy" to get more tailored feedback for your specific use case.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
