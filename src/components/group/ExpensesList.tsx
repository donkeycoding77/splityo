import { PencilSquareIcon } from '@heroicons/react/20/solid';

interface Member {
  id: string;
  name: string;
}

interface Expense {
  id: string;
  group_id: string;
  description: string;
  amount: number;
  paid_by_member_id: string;
  split_between: {
    member_id: string;
    amount: number;
  }[];
  date: string;
  created_at: string;
}

interface ExpensesListProps {
  expenses: Expense[];
  currency: string;
  showAllExpenses: boolean;
  onToggleShowAll: () => void;
  onEditExpense: (expense: Expense) => void;
  onAddExpense: () => void;
  members: { id: string; name: string }[];
}

export default function ExpensesList({
  expenses,
  currency,
  showAllExpenses,
  onToggleShowAll,
  onEditExpense,
  onAddExpense,
  members
}: ExpensesListProps) {
  const displayedExpenses = showAllExpenses ? expenses : expenses.slice(0, 2);

  return (
    <div className="w-full max-w-md card shadow-2xl mt-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-green-500">Expenses</h2>
        <button
          className="bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold text-sm py-2 px-4 transition-colors"
          onClick={onAddExpense}
        >
          Add Expense
        </button>
      </div>
      {displayedExpenses.length === 0 ? (
        <p className="text-gray-400 text-center py-4 text-lg font-semibold">No expenses yet</p>
      ) : (
        <ul className="space-y-3">
          {displayedExpenses.map((expense) => {
            const paidByName = members.find(m => m.id === expense.paid_by_member_id)?.name || 'Unknown';
            return (
              <li
                key={expense.id}
                className="bg-white border border-gray-200 rounded-xl px-3 py-2"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-black">{expense.description}</span>
                    <button
                      onClick={() => onEditExpense(expense)}
                      className="text-gray-400 hover:text-green-500 ml-1"
                      aria-label="Edit expense"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="font-bold text-green-500">
                    {currency === 'USD' ? '$' : currency}{expense.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-400 text-sm">{new Date(expense.date).toLocaleDateString()}</span>
                  <span className="text-gray-400 text-sm">paid by {paidByName}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {expenses.length > 2 && (
        <button
          className="mt-2 text-green-500 hover:text-green-500 font-semibold underline text-center w-full"
          onClick={onToggleShowAll}
        >
          {showAllExpenses ? 'Hide expenses...' : 'View all expenses...'}
        </button>
      )}
    </div>
  );
} 