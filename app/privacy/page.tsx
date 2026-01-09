import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] font-sans py-20 px-6">
      <div className="container max-w-3xl mx-auto space-y-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-xl text-[#86868B] font-medium">Your data is yours. We keep it that way.</p>
        <div className="text-left space-y-6 pt-10 border-t border-[#D2D2D7]/30">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Data Collection</h2>
            <p className="text-[#86868B] leading-relaxed">We only collect the information necessary to provide our services. This includes your email address for authentication and the prompts you submit for evaluation.</p>
          </section>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Data Usage</h2>
            <p className="text-[#86868B] leading-relaxed">Your prompts are used solely for evaluation purposes. We do not use your data to train our models or share it with third parties for marketing.</p>
          </section>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Security</h2>
            <p className="text-[#86868B] leading-relaxed">We implement industry-standard encryption to protect your data at rest and in transit.</p>
          </section>
        </div>
        <div className="pt-10">
          <Link href="/" className="text-[#0071E3] font-semibold hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
