import { PlusIcon } from '@heroicons/react/20/solid';

interface Settlement {
  from: string;
  to: string;
  amount: number;
}

interface ExpenseGroup {
  name: string;
  primary_member_id: string;
  members: string[];
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  paid_by_member_id: string;
  split_between: {
    member_id: string;
    amount: number;
  }[];
  date: string;
}

interface SettlementListProps {
  expenses: Expense[];
  settlements: Settlement[];
  currency: string;
  onShowDetails: () => void;
  members: { id: string; name: string }[];
  expenseGroups: ExpenseGroup[];
  onAddExpenseGroup: () => void;
}

export default function SettlementList({
  expenses,
  settlements,
  currency,
  onShowDetails,
  members,
  expenseGroups,
  onAddExpenseGroup
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
            The settlement is calculated to be completed in the fewest number of transactions possible.
          </p>
        </>
      )}

      {/* Expense Groups Section */}
      <div className="mt-2 pt-2 border-t border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-pink-500">Expense Groups</h3>
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full font-semibold text-sm py-1 px-4 transition-colors flex items-center gap-1"
            onClick={onAddExpenseGroup}
          >
            <PlusIcon className="w-4 h-4" />
            New Group
          </button>
        </div>
        {expenseGroups.length === 0 ? (
          <div className="">
            <p className="text-gray-400 text-center pt-2 pb-4 text-md font-semibold">No expense groups</p>
            <p className="text-gray-500 text-sm">
              Perfect for couples, families, or roommates - designate one person as the primary payer.
            </p>
          </div>
        ) : (
          <div>
          <ul className="divide-y divide-gray-200">
            {expenseGroups.map((group) => {
              const primaryMember = members.find(m => m.id === group.primary_member_id);
              const dependentMembers = group.members
                .filter(id => id !== group.primary_member_id)
                .map(id => members.find(m => m.id === id)?.name || 'Unknown');
              return (
                <li key={group.primary_member_id} className="py-1">
                  <div className="flex items-center gap-2">
                    <div className="font-bold text-gray-800 text-base">{group.name}:</div>
                    <div className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-500">{primaryMember?.name}</span>
                      <span> pays for </span>
                      <span>{dependentMembers.join(', ')}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="text-gray-500 text-sm mt-2">
            Perfect for couples, families, or roommates - designate one person as the primary payer.
          </p>
          </div>
        )}
      </div>
    </div>
  );
} 