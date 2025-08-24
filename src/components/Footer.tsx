"use client";
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="relative w-full flex flex-col items-center p-0 m-0">
      {/* Fade to black overlay at the bottom */}
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black/80 z-10 w-full" />
      <div className="w-full flex flex-col items-center justify-end pt-8 pb-8 min-h-[80px] z-20 relative">
        <div className="flex flex-row items-center justify-center gap-x-8 text-sm text-white w-full">
          <Link href="/privacy" className="hover:text-green-400 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-green-400 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
} 