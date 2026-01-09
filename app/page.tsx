import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, Sparkles, Zap, Shield, BarChart3 } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBFBFD] text-[#1D1D1F]">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container max-w-7xl flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary rounded-lg p-1.5">
              <Image src="/images/logo.png" alt="Logo" width={20} height={20} className="invert" />
            </div>
            <span className="text-lg font-bold tracking-tight">PromptPerfect</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" asChild className="rounded-full px-6">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="rounded-full px-6 shadow-lg shadow-primary/10">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container max-w-7xl px-6 pt-24 pb-32 text-center md:pt-32 md:pb-48">
          <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="mr-2 h-4 w-4" />
              Powered by Gemini 1.5 Flash
            </div>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              The gold standard for <span className="text-primary">prompt engineering.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-slate-500 font-medium md:text-2xl leading-relaxed">
              Evaluate, refine, and optimize your LLM prompts with AI-driven precision. Get instant scores and actionable insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="rounded-full px-10 h-14 text-lg font-semibold shadow-xl shadow-primary/20">
                <Link href="/signup">
                  Start Analyzing Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-10 h-14 text-lg font-semibold bg-white">
                <Link href="/login">View Demo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-white py-32 border-y border-slate-100">
          <div className="container max-w-7xl px-6">
            <div className="grid gap-12 md:grid-cols-3">
              {[
                {
                  icon: <Zap className="h-6 w-6 text-amber-500" />,
                  title: "Instant Scoring",
                  description: "Get immediate feedback on clarity, relevance, and coherence with our proprietary AI scoring engine."
                },
                {
                  icon: <Split className="h-6 w-6 text-blue-500" />,
                  title: "A/B Testing",
                  description: "Compare two prompts side-by-side to see which one performs better for your specific use case."
                },
                {
                  icon: <BarChart3 className="h-6 w-6 text-emerald-500" />,
                  title: "Custom Metrics",
                  description: "Define your own evaluation criteria like Tone, Brevity, or Technical Depth for tailored results."
                }
              ].map((feature, i) => (
                <div key={i} className="space-y-4 p-8 rounded-3xl bg-[#FBFBFD] border border-slate-100 transition-all hover:shadow-xl hover:shadow-slate-200/50">
                  <div className="bg-white rounded-2xl p-3 w-fit shadow-sm border border-slate-100">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof / CTA */}
        <section className="container max-w-7xl px-6 py-32 text-center">
          <div className="mx-auto max-w-3xl space-y-8 rounded-[3rem] bg-slate-900 p-12 md:p-24 text-white shadow-2xl">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Ready to perfect your prompts?</h2>
            <p className="text-xl text-slate-400">Join thousands of developers and AI enthusiasts building better interactions.</p>
            <Button size="lg" variant="secondary" asChild className="rounded-full px-10 h-14 text-lg font-semibold">
              <Link href="/signup">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-12 bg-white">
        <div className="container max-w-7xl px-6 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2.5 opacity-50">
            <div className="bg-slate-900 rounded-lg p-1">
              <Image src="/images/logo.png" alt="Logo" width={16} height={16} className="invert" />
            </div>
            <span className="text-sm font-bold tracking-tight">PromptPerfect</span>
          </div>
          <p className="text-sm text-slate-400">
            © 2026 PromptPerfect. Built for the future of AI.
          </p>
          <div className="flex gap-8 text-sm font-medium text-slate-400">
            <Link href="#" className="hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
