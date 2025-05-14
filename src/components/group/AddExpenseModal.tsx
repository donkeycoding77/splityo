import ExpenseFormModal from './ExpenseFormModal';

interface Member {
  id: string;
  name: string;
}

interface AddExpenseModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
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

export default function AddExpenseModal(props: AddExpenseModalProps) {
  return (
    <ExpenseFormModal
      {...props}
      title="Add Expense"
      submitText="Add Expense"
    />
  );
} 