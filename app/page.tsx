import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center bg-gradient-to-tr from-[#F8FAFC] to-[#E0F2FE] dark:from-[#0F172A] dark:to-[#1E293B]">
      <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-[#1C68F3] drop-shadow-lg">
        UXerra
      </h1>
      <p className="text-2xl md:text-3xl mb-8 text-gray-700 dark:text-gray-200 max-w-2xl">
        Inspire. Automate. Lead the Future.<br />
        <span className="text-[#F97316]">AI-powered creative platform for design, automation, and innovation.</span>
      </p>
      <Link href="#get-started" className="px-8 py-4 rounded-xl bg-[#1C68F3] text-white text-xl font-semibold shadow-lg hover:bg-[#0F172A] transition">
        Get Started
      </Link>
      <div className="mt-12 flex flex-wrap gap-6 justify-center">
        <Link href="#features" className="text-lg font-medium text-[#38BDF8] hover:underline">Features</Link>
        <Link href="#pricing" className="text-lg font-medium text-[#F97316] hover:underline">Pricing</Link>
        <Link href="/ai-demo" className="text-lg font-medium text-[#22C55E] hover:underline">AI Demo</Link>
        <Link href="/marketplace" className="text-lg font-medium text-[#8B5CF6] hover:underline">Marketplace</Link>
      </div>
    </section>
  );
} 