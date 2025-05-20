import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';

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

interface ExpenseFormModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onDelete?: () => Promise<void>;
  title: string;
  submitText: string;
  members: Member[];
  currency: string;
  payer: string;
  setPayer: (payer: string) => void;
  description: string;
  setDescription: (description: string) => void;
  amount: string;
  setAmount: (amount: string) => void;
  date: string;
  setDate: (date: string) => void;
  splitType: 'equal' | 'custom';
  setSplitType: (type: 'equal' | 'custom') => void;
  splitBetween: string[];
  setSplitBetween: (members: string[]) => void;
  isLoading: boolean;
  error: string | null;
}

export default function ExpenseFormModal({
  show,
  onClose,
  onSubmit,
  onDelete,
  title,
  submitText,
  members,
  currency,
  payer,
  setPayer,
  description,
  setDescription,
  amount,
  setAmount,
  date,
  setDate,
  splitType,
  setSplitType,
  splitBetween,
  setSplitBetween,
  isLoading,
  error
}: ExpenseFormModalProps) {
  const [splitAmounts, setSplitAmounts] = useState<Record<string, string>>({});

  useEffect(() => {
    if (show) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [show]);

  useEffect(() => {
    setSplitAmounts(splitBetween.reduce((acc, m) => {
      acc[m] = splitAmounts[m] || '';
      return acc;
    }, {} as Record<string, string>));
  }, [splitBetween, members]);

  useEffect(() => {
    if (splitType === 'custom' && amount && splitBetween.length > 0) {
      const totalCents = Math.round(parseFloat(amount) * 100);
      const baseCents = Math.floor(totalCents / splitBetween.length);
      const remainder = totalCents - baseCents * splitBetween.length;
      const splitArr = splitBetween.map((m, i) =>
        ((baseCents + (i < remainder ? 1 : 0)) / 100).toFixed(2)
      );
      setSplitAmounts(splitBetween.reduce((acc, m, i) => {
        acc[m] = splitArr[i];
        return acc;
      }, {} as Record<string, string>));
    }
  }, [amount, splitBetween, splitType]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-main-gradient bg-opacity-90 px-4 sm:px-0 overflow-y-auto">
      <div className="w-full max-w-md relative max-h-[90vh]">
        <div className="card border-1 shadow-2xl relative">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 text-2xl font-bold focus:outline-none"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
          <h2 className="text-xl font-bold mb-2 text-green-500">{title}</h2>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div>
              <label className="block font-semibold mb-1">Description</label>
              <input
                className="input-main"
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                disabled={isLoading}
                placeholder="e.g. Uber"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <label className="font-semibold">Paid by</label>
                <Menu as="div" className="relative flex-1">
                  <Menu.Button
                    className="input-main bg-white flex justify-between items-center w-full px-4 py-2 text-left font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    disabled={isLoading}
                  >
                    <span>{members.find(m => m.id === payer)?.name || 'Select member'}</span>
                    <ChevronDownIcon className="w-4 h-4 text-gray-400 ml-2" aria-hidden="true" />
                  </Menu.Button>
                  <Menu.Items className="absolute z-10 mt-1 w-full origin-top-left rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="py-1">
                      {members.map((m) => (
                        <Menu.Item key={m.id}>
                          {({ active }) => (
                            <button
                              type="button"
                              className={`block w-full text-left px-4 py-2 text-base font-medium text-gray-700 transition-colors ${active ? 'bg-green-50 text-green-600' : ''}`}
                              onClick={() => setPayer(m.id)}
                            >
                              {m.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col flex-1">
                  <label className="block font-semibold mb-1">Amount</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{currency === 'USD' ? '$' : currency}</span>
                    <input
                      className="input-main w-32"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={amount}
                      onChange={e => {
                        let val = e.target.value;
                        // Only allow up to 2 decimal places
                        if (/^\d*(\.\d{0,2})?$/.test(val)) {
                          setAmount(val);
                        }
                      }}
                      required
                      disabled={isLoading}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <label className="block font-semibold mb-1">Date</label>
                  <input
                    className="input-main"
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-2 mb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="splitType"
                    value="equal"
                    checked={splitType === 'equal'}
                    onChange={() => {
                      setSplitType('equal');
                      setSplitBetween(members.map(m => m.id));
                    }}
                    disabled={isLoading}
                  />
                  <span>Split equally between everyone</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="splitType"
                    value="custom"
                    checked={splitType === 'custom'}
                    onChange={() => {
                      setSplitType('custom');
                      setSplitBetween([]);
                    }}
                    disabled={isLoading}
                  />
                  <span>Custom split</span>
                </label>
              </div>
              {splitType === 'custom' && (
                <div className="overflow-x-auto border-1 border-gray-400 rounded-lg px-2 bg-gray-50">
                  <table className="min-w-full border-separate border-spacing-y-2">
                    <tbody>
                      {members.map((m, index) => {
                        const selected = splitBetween.includes(m.id);
                        return (
                          <tr key={m.id}>
                            <td className="align-middle">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={selected}
                                  onChange={e => {
                                    if (e.target.checked) {
                                      setSplitBetween([...splitBetween, m.id]);
                                    } else {
                                      setSplitBetween(splitBetween.filter(x => x !== m.id));
                                    }
                                  }}
                                  disabled={isLoading}
                                />
                                <span
                                  className={
                                    `inline-flex items-center justify-start rounded-2xl border px-3 py-1 text-gray-700 text-sm shadow-sm ` +
                                    (selected
                                      ? 'bg-orange-100 border-orange-500 text-orange-600 font-bold'
                                      : 'bg-white border-orange-300')
                                  }
                                >
                                  {m.name}
                                </span>
                                <input
                                  type="number"
                                  className={"input-main input-custom-split" +
                                    (selected ? ' input-custom-highlight' : '')
                                  }
                                  placeholder="0.00"
                                  min="0"
                                  step="0.01"
                                  value={splitAmounts[m.id] || ''}
                                  readOnly
                                  disabled={!selected || isLoading}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className={`flex gap-2 mt-2 ${onDelete ? '' : 'flex-col'}`}>
              {onDelete && (
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold text-sm py-2 px-4 transition-colors w-full"
                  disabled={isLoading}
                  onClick={onDelete}
                >
                  Delete
                </button>
              )}
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold text-sm py-2 px-4 transition-colors w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : submitText}
              </button>
            </div>
          </form>
        </div>
        <br />
      </div>
    </div>
  );
} 