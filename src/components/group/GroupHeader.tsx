import Link from 'next/link';

interface Member {
  id: string;
  name: string;
}

interface GroupHeaderProps {
  name: string;
  currency: string;
  members: Member[];
  description: string | null;
  urls: { title: string; url: string }[] | null;
}

export default function GroupHeader({ name, currency, members, description, urls }: GroupHeaderProps) {
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
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-2xl font-bold text-orange-400">{name}</h2>
          <span className="ml-2 px-2 py-1 rounded-xl border border-gray-100 text-orange-400 text-base shadow-sm">{currency}</span>
        </div>
        <div className="space-y-2">
          {description && (
            <div>
              <p className="text-gray-500 text-sm italic">{description}</p>
            </div>
          )}
          {urls && urls.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {urls.map((url, index) => (
                <div key={index} className="flex items-center text-gray-700 text-sm gap-x-1">
                  <span className="font-semibold text-orange-400">{url.title}:</span>
                  <a
                    href={url.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline max-w-[200px] truncate"
                    title={url.url}
                  >
                    {url.url}
                  </a>
                </div>
              ))}
            </div>
          )}
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