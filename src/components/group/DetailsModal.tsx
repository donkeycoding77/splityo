interface Member {
  id: string;
  name: string;
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

interface DetailsModalProps {
  show: boolean;
  onClose: () => void;
  expenses: Expense[];
  members: Member[];
  currency: string;
  totalAmount: number;
  memberTotals: Record<string, number>;
}

export default function DetailsModal({
  show,
  onClose,
  expenses,
  members,
  currency,
  totalAmount,
  memberTotals
}: DetailsModalProps) {
  if (!show) return null;

  function getCellColor(value: number) {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-main-gradient bg-opacity-90 px-4 sm:px-0 overflow-y-auto">
      <div className="w-full max-w-4xl relative max-h-[90vh]">
        <div className="card border-1 shadow-2xl relative">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 text-2xl font-bold focus:outline-none"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
          <h2 className="text-xl font-bold mb-4 text-green-500">Expense Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-pink-50">
                  <th className="px-2 py-1 border">Expense</th>
                  <th className="px-2 py-1 border">Paid by</th>
                  <th className="px-2 py-1 border">Amount</th>
                  {members.map((member) => (
                    <th key={member.id} className="px-2 py-1 border">{member.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp) => (
                  <tr key={exp.id}>
                    <td className="px-2 py-1 border">{exp.description}</td>
                    <td className="px-2 py-1 border">
                      {members.find(m => m.id === exp.paid_by_member_id)?.name}
                    </td>
                    <td className="px-2 py-1 border">
                      {currency === 'USD' ? '$' : currency}{exp.amount.toFixed(2)}
                    </td>
                    {members.map((member) => {
                      const split = exp.split_between.find(s => s.member_id === member.id);
                      let value = 0;
                      if (exp.paid_by_member_id === member.id) {
                        value = exp.amount;
                      }
                      if (split) {
                        value -= split.amount;
                      }
                      return (
                        <td key={member.id} className={`px-2 py-1 border border-black text-right ${getCellColor(value)}`}>
                          {value !== 0 ? value.toFixed(2) : '0'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {/* Total row */}
                <tr className="bg-gray-50 font-bold">
                  <td colSpan={2} className="px-2 py-1 border text-right">Total</td>
                  <td className="px-2 py-1 border text-right">
                    {currency === 'USD' ? '$' : currency}{totalAmount.toFixed(2)}
                  </td>
                  {members.map((member) => (
                    <td key={member.id} className={`px-2 py-1 border border-black text-right ${getCellColor(memberTotals[member.id])}`}>
                      {memberTotals[member.id].toFixed(2)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
} 