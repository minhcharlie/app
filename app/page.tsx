import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="PromptPerfect Logo" width={32} height={32} />
          <span className="text-xl font-bold tracking-tight">PromptPerfect</span>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="container flex flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Perfect Your Prompts with <span className="text-primary">AI Precision</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Evaluate, improve, and optimize your LLM prompts. Get instant scores for clarity, relevance, and coherence.
            </p>
          </div>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">Start Analyzing for Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">View Demo</Link>
            </Button>
          </div>
          <div className="relative mt-16 w-full max-w-5xl overflow-hidden rounded-xl border bg-background shadow-2xl">
            <div className="aspect-video bg-slate-100 flex items-center justify-center text-slate-400">
              [App Preview Screenshot Placeholder]
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 PromptPerfect. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">Privacy</Link>
            <Link href="#" className="hover:underline">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
