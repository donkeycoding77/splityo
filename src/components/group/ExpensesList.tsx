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
}

export default function ExpensesList({
  expenses,
  currency,
  showAllExpenses,
  onToggleShowAll,
  onEditExpense,
  onAddExpense,
}: ExpensesListProps) {
  const displayedExpenses = showAllExpenses ? expenses : expenses.slice(0, 5);

  return (
    <div className="w-full max-w-md card shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Expenses</h2>
        <button
          className="btn-secondary text-sm py-1 px-3"
          onClick={onAddExpense}
        >
          Add Expense
        </button>
      </div>
      {displayedExpenses.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No expenses yet</p>
      ) : (
        <div className="space-y-2">
          {displayedExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
            >
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{expense.description}</div>
                <div className="text-sm text-gray-500">
                  {new Date(expense.date).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-semibold text-gray-800">
                    {currency === 'USD' ? '$' : currency}{expense.amount.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {expense.split_between.length} people
                  </div>
                </div>
                <button
                  onClick={() => onEditExpense(expense)}
                  className="text-gray-400 hover:text-pink-500"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {expenses.length > 5 && (
        <button
          className="w-full mt-4 text-center text-gray-500 hover:text-pink-500 font-semibold"
          onClick={onToggleShowAll}
        >
          {showAllExpenses ? 'Show Less' : `Show All (${expenses.length})`}
        </button>
      )}
    </div>
  );
} 