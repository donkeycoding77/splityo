import Link from 'next/link';

interface Member {
  id: string;
  name: string;
}

interface GroupHeaderProps {
  name: string;
  currency: string;
  members: Member[];
}

export default function GroupHeader({ name, currency, members }: GroupHeaderProps) {
  return (
    <>
      <Link href="/" className="inline-flex items-center gap-2 text-green-500 hover:text-pink-500 font-bold text-lg transition-colors">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl flex items-center justify-center bebas-neue-regular">
          <span className="text-2xl sm:text-4xl">💸&nbsp;&nbsp;</span>
          <span className="text-pink-500">split</span>
          <span>yo</span>
          <span className="text-green-500">.cash</span>
          <span className="text-2xl sm:text-4xl">&nbsp;&nbsp;💸</span>
        </h1>
      </Link>

      <div className="w-full max-w-md card shadow-2xl mt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-orange-400">{name}</h2>
          <span className="ml-2 px-2 py-1 rounded-xl border border-gray-100 text-orange-400 text-base shadow-sm">{currency}</span>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800">Members</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {members.map((member, index) => (
                <span key={`${member.id}-${index}`} className="flex items-center rounded-2xl border border-orange-300 bg-white px-3 py-1 text-gray-700 text-sm shadow-sm">
                  {`${member.name}`}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 