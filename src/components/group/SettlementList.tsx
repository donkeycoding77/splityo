import { PlusIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import ShareSettlementModal from './ShareSettlementModal';

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
  onDeleteExpenseGroup: (group: ExpenseGroup) => void;
  groupName: string;
}

export default function SettlementList({
  expenses,
  settlements,
  currency,
  onShowDetails,
  members,
  expenseGroups,
  onAddExpenseGroup,
  onDeleteExpenseGroup,
  groupName
}: SettlementListProps) {
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <div className="w-full max-w-md card shadow-2xl mt-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-pink-500">Settle Up</h2>
        <button
          onClick={() => setShowShareModal(true)}
          className="text-gray-400 hover:text-pink-500 transition-colors"
          title="Share settlement"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>
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
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-gray-800 text-base">{group.name}:</div>
                      <div className="text-sm text-gray-700">
                        <span className="font-bold text-gray-500">{primaryMember?.name}, </span>
                        <span>{dependentMembers.join(', ')}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onDeleteExpenseGroup(group)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete expense group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
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

      <ShareSettlementModal
        show={showShareModal}
        onClose={() => setShowShareModal(false)}
        settlements={settlements}
        members={members}
        currency={currency}
        groupName={groupName}
      />
    </div>
  );
} 