import { useState } from 'react';

interface Settlement {
  from: string;
  to: string;
  amount: number;
}

interface ShareSettlementModalProps {
  show: boolean;
  onClose: () => void;
  settlements: Settlement[];
  members: { id: string; name: string }[];
  currency: string;
  groupName: string;
}

export default function ShareSettlementModal({
  show,
  onClose,
  settlements,
  members,
  currency,
  groupName
}: ShareSettlementModalProps) {
  const [copied, setCopied] = useState(false);

  if (!show) return null;

  const getSettlementText = () => {
    const currencySymbol = currency === 'USD' ? '$' : currency;
    const settlementLines = settlements.map(s => {
      const fromName = members.find(m => m.id === s.from)?.name || 'Unknown';
      const toName = members.find(m => m.id === s.to)?.name || 'Unknown';
      return `${fromName} pays ${toName} ${currencySymbol}${s.amount.toFixed(2)}`;
    });

    const url = typeof window !== 'undefined' ? window.location.href : '';
    return `Settlement for ${groupName}:\n\n${settlementLines.join('\n')}\n\nView details at: ${url}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getSettlementText());
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
          <h2 className="text-xl font-bold mb-4 text-pink-500">Share Settlement</h2>
          <div className="flex flex-col gap-4">
            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap font-mono text-sm">
              {getSettlementText()}
            </div>
            <button
              onClick={handleCopy}
              className="bg-pink-500 hover:bg-pink-600 text-white rounded-full font-semibold text-sm py-2 px-4 transition-colors w-full"
            >
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
} 