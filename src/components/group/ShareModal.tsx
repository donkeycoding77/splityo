import { useState } from 'react';

interface ShareModalProps {
  show: boolean;
  onClose: () => void;
  url: string;
}

export default function ShareModal({ show, onClose, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!show) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-main-gradient bg-opacity-90 px-4 sm:px-0 overflow-y-auto">
      <div className="w-full max-w-md relative max-h-[90vh]">
        <div className="card shadow-2xl relative">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 text-2xl font-bold focus:outline-none"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
          <h2 className="text-xl font-bold mb-4 text-green-500">Share Group</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={url}
              readOnly
              className="input-main flex-1"
            />
            <button
              onClick={handleCopy}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold text-sm py-2 px-4 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
} 