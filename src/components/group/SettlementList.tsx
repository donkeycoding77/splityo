interface Settlement {
  from: string;
  to: string;
  amount: number;
}

interface SettlementListProps {
  expenses: any[];
  settlements: Settlement[];
  currency: string;
  onShowDetails: () => void;
  members: { id: string; name: string }[];
}

export default function SettlementList({
  expenses,
  settlements,
  currency,
  onShowDetails,
  members
}: SettlementListProps) {
  return (
    <div className="w-full max-w-md card shadow-2xl mt-6">
      <h2 className="text-xl font-bold mb-2 text-pink-500">Settle Up</h2>
      {expenses.length === 0 ? (
        <div>
          <div className="text-center text-gray-400 py-4 text-lg font-semibold">
            All members are settled up!
            <br />
          </div>
          <p className="text-gray-500 text-sm mt-2">
            The settlement method allows you to check 'who needs to repay whom' and 'how much'. 
            The settlement is calculated to be completed in the fewest number of transactions possible.
          </p>
        </div>
      ) : (
        <>
          {settlements.length === 0 ? (
            <p className="text-gray-500">Everyone is settled up!</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {settlements.map((s, i) => (
                <li key={i} className="py-2 flex justify-between items-center">
                  <span>
                    <span className="font-bold">{members.find(m => m.id === s.from)?.name || 'Unknown'}</span>
                    <span className="mx-2">→</span>
                    <span className="font-bold">{members.find(m => m.id === s.to)?.name || 'Unknown'}</span>
                  </span>
                  <span className="font-bold text-pink-500">
                    {currency === 'USD' ? '$' : currency}{s.amount.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <button
            className="mt-2 text-pink-500 hover:text-pink-500 font-semibold underline text-center w-full"
            onClick={onShowDetails}
          >
            View details...
          </button>
          <p className="text-gray-500 text-sm mt-2">
            The settlement method allows you to check 'who needs to repay whom' and 'how much'. 
            The settlement is calculated to be completed in the fewest number of transactions possible.
          </p>
        </>
      )}
    </div>
  );
} 