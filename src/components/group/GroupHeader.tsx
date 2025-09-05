import { useState } from 'react';
import ShareModal from './ShareModal';

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
  activeTab: 'expenses' | 'lists';
  onTabChange: (tab: 'expenses' | 'lists') => void;
}

export default function GroupHeader({ name, currency, members, description, urls, activeTab, onTabChange }: GroupHeaderProps) {
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <>
      <div className="w-full max-w-md card shadow-2xl mt-4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-2xl font-bold text-orange-400">{name}</h2>
          <div className="flex items-center gap-2">
            <span className="py-1 font-bold text-gray-400 text-base">{currency}</span>
            <button
              onClick={() => setShowShareModal(true)}
              className="text-gray-400 hover:text-orange-500 transition-colors"
              title="Share group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
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
        
        {/* Tab Navigation */}
        <div className="flex mt-4 pt-4">
          <div className="flex bg-gray-100 rounded-full p-0.5 gap-0.5 w-full">
            <button
              onClick={() => onTabChange('expenses')}
              className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 flex-1 ${
                activeTab === 'expenses'
                  ? 'bg-white text-orange-500 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Expenses
            </button>
            <button
              onClick={() => onTabChange('lists')}
              className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 flex-1 ${
                activeTab === 'lists'
                  ? 'bg-white text-orange-500 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Lists
            </button>
          </div>
        </div>
      </div>

      <ShareModal
        show={showShareModal}
        onClose={() => setShowShareModal(false)}
        url={typeof window !== 'undefined' ? window.location.href : ''}
      />
    </>
  );
} 