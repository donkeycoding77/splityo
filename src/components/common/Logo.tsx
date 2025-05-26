import Link from 'next/link';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 text-green-500 hover:text-pink-500 font-bold text-lg transition-colors ${className}`}>
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl flex items-center justify-center bebas-neue-regular">
        <span className="text-2xl sm:text-4xl">💸&nbsp;&nbsp;</span>
        <span className="text-pink-500">split</span>
        <span>yo</span>
        <span className="text-green-500">.cash</span>
        <span className="text-2xl sm:text-4xl">&nbsp;&nbsp;💸</span>
      </h1>
    </Link>
  );
} 