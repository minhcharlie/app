import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, Sparkles, Zap, Split, BarChart3, Shield, MessageSquare, Globe, Layers, ChevronDown } from 'lucide-react'
import { PricingButton } from '@/components/PricingButton'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-[#1D1D1F] font-sans selection:bg-[#0071E3] selection:text-white">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-[#D2D2D7]/30 bg-white/80 backdrop-blur-xl">
        <div className="container max-w-[1200px] flex h-12 items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <span className="text-lg font-bold tracking-tight">PromptScore</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-xs font-medium text-[#1D1D1F]/80 hover:text-[#0071E3] transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-xs font-medium text-[#1D1D1F]/80 hover:text-[#0071E3] transition-colors">How it works</Link>
              <Link href="#pricing" className="text-xs font-medium text-[#1D1D1F]/80 hover:text-[#0071E3] transition-colors">Pricing</Link>
              <Link href="#faq" className="text-xs font-medium text-[#1D1D1F]/80 hover:text-[#0071E3] transition-colors">FAQ</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-xs font-medium text-[#1D1D1F]/80 hover:text-[#0071E3] transition-colors">Login</Link>
            <Button asChild size="sm" className="h-7 rounded-full bg-[#0071E3] px-4 text-[11px] font-semibold hover:bg-[#0077ED]">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
          <div className="container max-w-[1200px] px-6 text-center">
            <div className="mx-auto max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1]">
                Precision in every <br className="hidden md:block" />
                <span className="bg-gradient-to-b from-[#1D1D1F] to-[#1D1D1F]/60 bg-clip-text text-transparent">interaction.</span>
              </h1>
              <p className="mx-auto max-w-2xl text-xl text-[#86868B] font-medium md:text-2xl leading-relaxed">
                The professional environment to evaluate, refine, and <br className="hidden md:block" />
                optimize your AI prompts with surgical accuracy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button size="lg" asChild className="rounded-full bg-[#0071E3] px-10 h-14 text-lg font-semibold hover:bg-[#0077ED] shadow-xl shadow-blue-500/10">
                  <Link href="/signup">Try it free</Link>
                </Button>
                <Button size="lg" variant="ghost" asChild className="rounded-full px-10 h-14 text-lg font-semibold text-[#0071E3] hover:bg-blue-50">
                  <Link href="/login" className="flex items-center">
                    View Demo <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Product Mock Placeholder */}
            <div className="relative mt-24 mx-auto max-w-5xl animate-in fade-in zoom-in-95 duration-1000 delay-300">
              <div className="aspect-[16/10] rounded-[2.5rem] bg-[#F5F5F7] border border-[#D2D2D7]/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden p-4">
                <div className="w-full h-full rounded-[1.5rem] bg-white shadow-sm flex items-center justify-center text-[#86868B] font-medium">
                  <div className="flex flex-col items-center gap-4">
                    <Layers className="h-12 w-12 opacity-20" />
                    <span>PromptScore Interface Preview</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Strip */}
        <section className="border-y border-[#D2D2D7]/30 bg-[#F5F5F7]/50 py-12">
          <div className="container max-w-[1200px] px-6">
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-40 grayscale">
              <div className="text-xl font-bold tracking-tighter">TECHCORP</div>
              <div className="text-xl font-bold tracking-tighter">NEXUS AI</div>
              <div className="text-xl font-bold tracking-tighter">QUANTUM</div>
              <div className="text-xl font-bold tracking-tighter">LUMINA</div>
              <div className="text-xl font-bold tracking-tighter">VERTEX</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 md:py-48">
          <div className="container max-w-[1200px] px-6">
            <div className="mb-24 max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                Engineered for <br /> excellence.
              </h2>
              <p className="text-xl text-[#86868B] font-medium leading-relaxed">
                Every tool you need to master the art of prompt engineering, built with a focus on clarity and performance.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: <Zap className="h-6 w-6 text-[#0071E3]" />,
                  title: "Instant Scoring",
                  description: "Get immediate, multi-dimensional feedback on clarity, relevance, and coherence."
                },
                {
                  icon: <Split className="h-6 w-6 text-[#0071E3]" />,
                  title: "A/B Comparison",
                  description: "Test variations side-by-side to identify the most effective prompt structure."
                },
                {
                  icon: <BarChart3 className="h-6 w-6 text-[#0071E3]" />,
                  title: "Custom Metrics",
                  description: "Define your own evaluation criteria tailored to your specific industry needs."
                },
                {
                  icon: <Shield className="h-6 w-6 text-[#0071E3]" />,
                  title: "Enterprise Security",
                  description: "Your prompts and data are protected with industry-leading encryption."
                },
                {
                  icon: <MessageSquare className="h-6 w-6 text-[#0071E3]" />,
                  title: "AI Suggestions",
                  description: "Receive actionable advice on how to improve your prompts for better results."
                },
                {
                  icon: <Globe className="h-6 w-6 text-[#0071E3]" />,
                  title: "Global History",
                  description: "Access your entire evaluation history from any device, anywhere."
                }
              ].map((feature, i) => (
                <div key={i} className="group p-10 rounded-[2.5rem] bg-[#F5F5F7] border border-transparent hover:bg-white hover:border-[#D2D2D7]/50 hover:shadow-xl transition-all duration-500">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-[#86868B] font-medium leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-[#1D1D1F] py-32 md:py-48 text-white overflow-hidden">
          <div className="container max-w-[1200px] px-6">
            <div className="text-center mb-24">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">Simple. Powerful.</h2>
              <p className="text-xl text-[#86868B] font-medium">Three steps to perfect your AI interactions.</p>
            </div>

            <div className="grid gap-12 md:grid-cols-3 relative">
              {[
                { step: "01", title: "Input", desc: "Paste your prompt into the lab environment." },
                { step: "02", title: "Analyze", desc: "Our AI engine evaluates every word for impact." },
                { step: "03", title: "Refine", desc: "Apply suggestions and export your optimized prompt." }
              ].map((item, i) => (
                <div key={i} className="relative space-y-6 p-8 rounded-[2rem] bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="text-5xl font-bold text-[#0071E3] opacity-50">{item.step}</div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-[#86868B] font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-32 md:py-48">
          <div className="container max-w-[1200px] px-6">
            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  quote: "PromptScore has completely transformed how our team interacts with LLMs. The clarity scores are a game-changer.",
                  author: "Sarah Chen",
                  role: "Lead AI Researcher"
                },
                {
                  quote: "The most polished prompt engineering tool I've used. It's simple, fast, and incredibly effective.",
                  author: "Marcus Thorne",
                  role: "Senior Developer"
                }
              ].map((t, i) => (
                <div key={i} className="p-12 rounded-[3rem] bg-[#F5F5F7] space-y-8">
                  <p className="text-3xl font-medium leading-tight tracking-tight">"{t.quote}"</p>
                  <div>
                    <div className="font-bold text-lg">{t.author}</div>
                    <div className="text-[#86868B] font-medium">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-32 md:py-48 bg-[#F5F5F7]/50">
          <div className="container max-w-[1200px] px-6">
            <div className="text-center mb-24">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">Choose your plan.</h2>
              <p className="text-xl text-[#86868B] font-medium">Simple pricing for professionals and teams.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {[
                {
                  name: "Basic",
                  price: "0",
                  priceId: "price_basic_placeholder",
                  desc: "Perfect for individuals and students.",
                  features: ["Unlimited single analyses", "Basic history tracking", "Standard AI model", "Markdown export"]
                },
                {
                  name: "Pro",
                  price: "0",
                  priceId: "price_pro_placeholder",
                  desc: "For power users and professional teams.",
                  features: ["A/B testing mode", "Custom evaluation criteria", "Advanced Gemini 1.5 Pro", "Collaboration links", "Priority support"]
                }
              ].map((plan, i) => (
                <div key={i} className={`p-12 rounded-[3rem] bg-white border ${i === 1 ? 'border-[#0071E3] shadow-2xl shadow-blue-500/5' : 'border-[#D2D2D7]/50'}`}>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                      <span className="text-[#86868B] font-medium">/month</span>
                    </div>
                  </div>
                  <p className="text-[#86868B] font-medium mb-8">{plan.desc}</p>
                  <ul className="space-y-4 mb-12">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm font-medium">
                        <CheckCircle2 className="h-5 w-5 text-[#0071E3]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <PricingButton 
                    priceId={plan.priceId}
                    className={`w-full h-14 rounded-full text-lg font-semibold ${i === 1 ? 'bg-[#0071E3] hover:bg-[#0077ED]' : 'bg-[#1D1D1F] hover:bg-black'}`}
                  >
                    Get Started
                  </PricingButton>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-32 md:py-48">
          <div className="container max-w-[800px] px-6">
            <h2 className="text-4xl font-bold tracking-tight text-center mb-24">Frequently Asked Questions</h2>
            <div className="space-y-8">
              {[
                { q: "How does the scoring work?", a: "We use advanced LLMs to analyze your prompt against established linguistic and logical frameworks for clarity, relevance, and coherence." },
                { q: "Can I use my own API key?", a: "Currently, we provide the AI engine as part of our service, but enterprise plans can integrate with custom endpoints." },
                { q: "Is my data private?", a: "Yes. We do not use your prompts to train our models, and all data is encrypted at rest." },
                { q: "What is A/B testing?", a: "It allows you to compare two different versions of a prompt to see which one performs better according to our AI evaluation." },
                { q: "Can I cancel anytime?", a: "Absolutely. You can manage your subscription in the settings panel at any time." }
              ].map((item, i) => (
                <div key={i} className="border-b border-[#D2D2D7]/50 pb-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center justify-between cursor-pointer group">
                    {item.q}
                    <ChevronDown className="h-5 w-5 text-[#86868B] group-hover:text-[#1D1D1F] transition-colors" />
                  </h3>
                  <p className="text-[#86868B] font-medium leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container max-w-[1200px] px-6 py-32 text-center">
          <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in duration-1000">
            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Perfect your prompts <br /> today.
            </h2>
            <p className="mx-auto max-w-xl text-xl text-[#86868B] font-medium">
              Join the next generation of prompt engineers.
            </p>
            <div className="pt-4">
              <Button size="lg" asChild className="rounded-full bg-[#0071E3] px-12 h-16 text-xl font-semibold hover:bg-[#0077ED] shadow-2xl shadow-blue-500/20">
                <Link href="/signup">Get Started for Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#D2D2D7]/30 py-20 bg-[#F5F5F7]">
        <div className="container max-w-[1200px] px-6">
          <div className="grid gap-12 md:grid-cols-4 mb-20">
            <div className="space-y-4">
              <div className="text-lg font-bold tracking-tight">PromptScore</div>
              <p className="text-sm text-[#86868B] font-medium leading-relaxed">
                The professional standard for prompt evaluation and optimization.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-[#86868B] font-medium">
                <li><Link href="#features" className="hover:text-[#1D1D1F] transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-[#1D1D1F] transition-colors">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-[#1D1D1F] transition-colors">The Lab</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-[#86868B] font-medium">
                <li><Link href="#" className="hover:text-[#1D1D1F] transition-colors">Help Center</Link></li>
                <li><Link href="#faq" className="hover:text-[#1D1D1F] transition-colors">FAQ</Link></li>
                <li><Link href="#" className="hover:text-[#1D1D1F] transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-[#86868B] font-medium">
                <li><Link href="#" className="hover:text-[#1D1D1F] transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-[#1D1D1F] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-[#D2D2D7]/30 text-xs text-[#86868B] font-medium">
            <p>© 2026 PromptScore Inc. All rights reserved.</p>
            <div className="flex gap-8">
              <span>United States</span>
              <div className="flex gap-4">
                <Link href="#" className="hover:text-[#1D1D1F]">Twitter</Link>
                <Link href="#" className="hover:text-[#1D1D1F]">LinkedIn</Link>
                <Link href="#" className="hover:text-[#1D1D1F]">GitHub</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
