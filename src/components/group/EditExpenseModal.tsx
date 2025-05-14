import ExpenseFormModal from './ExpenseFormModal';

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
  created_at: string;
}

interface EditExpenseModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onDelete: () => Promise<void>;
  expense: Expense | null;
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

export default function EditExpenseModal(props: EditExpenseModalProps) {
  if (!props.show || !props.expense) return null;

  return (
    <ExpenseFormModal
      {...props}
      title="Edit Expense"
      submitText="Save Changes"
    />
  );
} 