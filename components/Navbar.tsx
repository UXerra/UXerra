import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#0F172A]/90 backdrop-blur border-b border-[#38BDF8]/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-2xl text-[#0F172A] dark:text-white">
          <span className="bg-gradient-to-r from-[#38BDF8] to-[#F97316] bg-clip-text text-transparent">UXerra</span>
          <span className="hidden sm:inline font-light text-base text-[#38BDF8]">Studio</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="#features" className="hover:text-[#38BDF8] transition font-medium">Features</Link>
          <Link href="#pricing" className="hover:text-[#F97316] transition font-medium">Pricing</Link>
          <Link href="/login" className="hover:text-[#0F172A] dark:hover:text-white transition font-medium">Login</Link>
          <Link href="#get-started" className="ml-2 px-5 py-2 rounded-full bg-[#38BDF8] text-white font-semibold shadow hover:bg-[#0F172A] transition hidden sm:inline-block">Get Started</Link>
        </div>
      </div>
    </nav>
  );
} 