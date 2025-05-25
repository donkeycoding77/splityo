"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [previousGroups, setPreviousGroups] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const groups = JSON.parse(localStorage.getItem('previousGroups') || '[]');
      setPreviousGroups(groups);
    }
  }, []);

  const handleRemoveGroup = (id: string) => {
    const updated = previousGroups.filter(g => g.id !== id);
    setPreviousGroups(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('previousGroups', JSON.stringify(updated));
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-200 via-pink-100 to-orange-100 relative overflow-hidden">
      {/* Wavy Background Accent */}
      <div className="absolute top-0 left-0 w-full h-40 bg-[url('data:image/svg+xml;utf8,<svg width=\'100%\' height=\'100\' viewBox=\'0 0 1440 320\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'><path fill=\'%23a7f3d0\' fill-opacity=\'1\' d=\'M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z\'></path></svg>')] bg-no-repeat bg-top z-0" />


      {/* Hero Section */}
      <div className="relative z-10 min-h-[220px] flex items-center justify-center py-4">
        {/* Fade overlay for hero section - full width */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 to-transparent z-0" />
        <div className="relative z-10 w-full max-w-7xl mx-auto sm:px-6 lg:px-8 px-5">
          <br /> <br />
          <h1 className="text-5xl py-4 font-extrabold tracking-tight text-gray-900 sm:text-6xl flex items-center justify-center gap-0 bebas-neue-regular">
            <span className="text-2xl sm:text-4xl">💸&nbsp;&nbsp;</span><span className="text-pink-500">split</span><span>yo</span><span className="text-green-500">.cash</span><span className="text-2xl sm:text-4xl">&nbsp;&nbsp;💸</span>
          </h1>
          <div className="text-center">
            <p className="sm:text-xl font-medium italic">
              The <span className="text-pink-500">easy</span> way to split money with your crew! 
            </p>
            <p className="text-lg font-medium italic">
              <span className="text-orange-400">No drama, just good vibes.</span> <span className="text-2xl">✨</span>
            </p>
            <div className="mt-4 flex items-center justify-center gap-x-6">
              <Link
                href="/create-group"
                className="rounded-full bg-green-400 px-6 py-3 text-2xl font-bold text-white shadow-lg hover:bg-pink-400 hover:scale-105 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 drop-shadow-md bebas-neue-regular"
              >
                Get Started <span className="text-base">🚀</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Previous Groups Section */}
      {previousGroups.length > 0 && (
        <div className="mx-auto max-w-2xl my-8 px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-2 ring-pink-200 flex flex-col items-center text-center w-full mb-8">
            <div className="text-xl bebas-neue-regular mb-2">👀&nbsp;&nbsp;Previous Groups</div>
            <div className="flex flex-wrap gap-3 justify-center">
              {previousGroups.map((group) => (
                <div key={group.id} className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-gray-700 text-lg shadow-sm">
                  <Link
                    href={`/group/${group.id}`}
                    className="flex items-center gap-2 hover:text-pink-500 transition-colors"
                  >
                    <span className="text-green-400">📝</span>
                    <span>{group.name || group.id}</span>
                  </Link>
                  <button
                    onClick={() => handleRemoveGroup(group.id)}
                    className="ml-2 text-gray-400 hover:text-pink-500 text-xl focus:outline-none"
                    aria-label={`Remove ${group.name || group.id}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="mx-auto max-w-5xl my-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 justify-items-center">

          {/* Feature 1 */}
          <div className="rounded-3xl bg-white p-8 shadow-xl ring-2 ring-green-200 hover:ring-pink-200 transition-all flex flex-col items-center text-center max-w-sm w-full">
            <div className="text-2xl bebas-neue-regular">🧮&nbsp;&nbsp;&nbsp;Smart Calculations</div>
            <p className="mt-2 text-gray-600 font-medium">
              Let us handle the complex math! 🤖 We&apos;ll split everything fairly and show who owes what.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-3xl bg-white p-8 shadow-xl ring-2 ring-green-200 hover:ring-pink-200 transition-all flex flex-col items-center text-center max-w-sm w-full">
            <div className="text-2xl bebas-neue-regular">👯‍♂️&nbsp;&nbsp;&nbsp;Squad Up</div>
            <p className="mt-2 text-gray-600 font-medium">
              Add your besties, roomies, or travel fam to your group. The more, the sillier! 🎉
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-3xl bg-white p-8 shadow-xl ring-2 ring-pink-200 hover:ring-orange-200 transition-all flex flex-col items-center text-center max-w-sm w-full">
            <div className="text-2xl bebas-neue-regular">🧾&nbsp;&nbsp;&nbsp;Drop Expenses</div>
            <p className="mt-2 text-gray-600 font-medium">
              Add who paid, who&apos;s in, and what&apos;s up. We&apos;ll do the math. No cap. 🤓
            </p>
          </div>

          {/* Feature 4 */}
          <div className="rounded-3xl bg-white p-8 shadow-xl ring-2 ring-orange-200 hover:ring-green-200 transition-all flex flex-col items-center text-center max-w-sm w-full">
            <div className="text-2xl bebas-neue-regular">💵&nbsp;&nbsp;&nbsp;Settle Up EZ</div>
            <p className="mt-2 text-gray-600 font-medium">
              See who owes what, pay up, and keep the vibes chill. ✌️
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-400 via-pink-400 to-orange-300 relative z-10">
        <div className="">
          <div className="text-center px-8 py-16 sm:px-6 lg:px-8 pb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl flex items-center justify-center gap-2 bebas-neue-regular">
              Ready to split it like a pro? <span className="text-4xl">🤑</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90 font-semibold">
              Just splityo.cash and make money stuff easy (and fun) again!
            </p>
            <div className="mt-8">
              <Link
                href="/create-group"
                className="rounded-full bg-white px-8 py-4 text-lg font-bold text-green-500 shadow-lg hover:bg-pink-100 hover:text-pink-500 hover:scale-105 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white drop-shadow-md bebas-neue-regular"
              >
                Create Your First Group 🎉
              </Link>
            </div>
          </div>

          {/* Footer Section for legal and contact links */}
          <div className="relative w-full flex flex-col items-center p-0 m-0">
            {/* Fade to black overlay at the bottom */}
            <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black/80 z-10 w-full" />
            <div className="w-full flex flex-col items-center justify-end pt-8 pb-4 min-h-[80px] z-20 relative">
              <div className="flex flex-col items-center gap-1 text-sm text-white/60 w-full">
                <Link href="/privacy" className="hover:text-pink-100 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-pink-100 transition-colors">Terms of Service</Link>
                <Link href="/contact" className="hover:text-pink-100 transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
