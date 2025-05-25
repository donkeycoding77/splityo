"use client";

import { useEffect, useState, use as usePromise } from 'react';
import { supabase } from '@/lib/supabase';
import GroupHeader from '@/components/group/GroupHeader';
import AddExpenseModal from '@/components/group/AddExpenseModal';
import ExpensesList from '@/components/group/ExpensesList';
import SettlementList from '@/components/group/SettlementList';
import DetailsModal from '@/components/group/DetailsModal';
import EditExpenseModal from '@/components/group/EditExpenseModal';
import AddExpenseGroupModal from '@/components/group/AddExpenseGroupModal';
import Footer from '@/components/Footer';

interface Member {
  id: string;
  name: string;
}

interface Group {
  id: string;
  name: string;
  currency: string;
  members: Member[];
  description: string | null;
  url: { title: string; url: string }[] | null;
  expense_groups: {
    name: string;
    primary_member_id: string;
    members: string[];
  }[];
  created_at: string;
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

export default function GroupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = usePromise(params);
  const [group, setGroup] = useState<Group | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseLoading, setExpenseLoading] = useState(false);
  const [expenseError, setExpenseError] = useState<string | null>(null);
  const [showAllExpenses, setShowAllExpenses] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditExpenseModal, setShowEditExpenseModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  // Add expense form state
  const [payer, setPayer] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [splitBetween, setSplitBetween] = useState<string[]>([]);
  const [splitType, setSplitType] = useState<'equal' | 'custom'>('equal');

  // Edit expense form state
  const [editPayer, setEditPayer] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editDate, setEditDate] = useState(new Date().toISOString().split('T')[0]);
  const [editSplitBetween, setEditSplitBetween] = useState<string[]>([]);
  const [editSplitType, setEditSplitType] = useState<'equal' | 'custom'>('equal');
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  // Add expense group state
  const [showExpenseGroupModal, setShowExpenseGroupModal] = useState(false);
  const [expenseGroupName, setExpenseGroupName] = useState('');
  const [selectedExpenseGroupMembers, setSelectedExpenseGroupMembers] = useState<string[]>([]);
  const [expenseGroupLoading, setExpenseGroupLoading] = useState(false);
  const [expenseGroupError, setExpenseGroupError] = useState<string | null>(null);
  const [primaryMemberId, setPrimaryMemberId] = useState('');

  // Fetch group and expenses
  useEffect(() => {
    async function fetchGroupAndExpenses() {
      setIsLoading(true);
      try {
        const { data: groupData, error: groupError } = await supabase
          .from('groups')
          .select('*')
          .eq('id', id)
          .single();
        if (groupError) throw groupError;
        // Ensure members is parsed as an array of objects
        groupData.members = Array.isArray(groupData.members)
          ? groupData.members
          : JSON.parse(groupData.members);
        setGroup(groupData);
        setPayer(groupData.members[0]?.id || '');
        setSplitBetween(groupData.members.map((m: Member) => m.id));
        // Store in localStorage as recently visited group
        if (typeof window !== 'undefined') {
          const prev = JSON.parse(localStorage.getItem('previousGroups') || '[]');
          // Remove if already present
          const filtered = prev.filter((g: {id: string}) => g.id !== groupData.id);
          // Add to front
          filtered.unshift({ id: groupData.id, name: groupData.name });
          // Limit to 5
          const limited = filtered.slice(0, 5);
          localStorage.setItem('previousGroups', JSON.stringify(limited));
        }
        // Fetch expenses
        const { data: expensesData, error: expensesError } = await supabase
          .from('expenses')
          .select('*')
          .eq('group_id', id)
          .order('date', { ascending: false });
        if (expensesError) throw expensesError;
        // Parse split_between for each expense
        const parsedExpenses = (expensesData || []).map((exp: Expense) => ({
          ...exp,
          split_between: Array.isArray(exp.split_between)
            ? exp.split_between
            : JSON.parse(exp.split_between)
        }));
        setExpenses(parsedExpenses);
      } catch (err) {
        setError('Failed to load group or expenses');
        console.error('Error fetching group/expenses:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGroupAndExpenses();
  }, [id]);

  // Add expense handler
  async function handleAddExpense(e: React.FormEvent) {
    e.preventDefault();
    setExpenseLoading(true);
    setExpenseError(null);
    if (!payer || !description || !amount || !date || splitBetween.length === 0) {
      setExpenseError('Please fill all fields and select at least one member to split.');
      setExpenseLoading(false);
      return;
    }
    try {
      const amountValue = parseFloat(amount);
      const share = amountValue / splitBetween.length;
      const splitBetweenData = splitBetween.map(memberId => ({
        member_id: memberId,
        amount: share
      }));

      const { data, error } = await supabase
        .from('expenses')
        .insert([
          {
            group_id: group!.id,
            description,
            amount: amountValue,
            paid_by_member_id: payer,
            split_between: splitBetweenData,
            date: date,
            created_at: new Date().toISOString(),
          },
        ])
        .select();
      if (error) throw error;
      setExpenses([data[0], ...expenses]);
      setDescription('');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setPayer(group!.members[0]?.id || '');
      setSplitBetween(group!.members.map(m => m.id));
      setShowExpenseModal(false);
    } catch (err) {
      setExpenseError('Failed to add expense.');
      console.error('Error adding expense:', err);
    } finally {
      setExpenseLoading(false);
    }
  }

  // Calculate balances and settlements
  function calculateBalances() {
    if (!group) return {};
    const balances: Record<string, number> = {};
    group.members.forEach(m => (balances[m.id] = 0));

    // First, calculate regular balances
    for (const exp of expenses) {
      for (const split of exp.split_between) {
        balances[split.member_id] -= split.amount;
      }
      balances[exp.paid_by_member_id] += exp.amount;
    }

    // Then, adjust balances based on expense groups
    for (const expGroup of (group.expense_groups || [])) {
      const primaryMember = expGroup.primary_member_id;
      const dependents = expGroup.members.filter(id => id !== primaryMember);

      // For each dependent, transfer their negative balance to the primary member
      for (const dependentId of dependents) {
        if (balances[dependentId] < 0) {
          balances[primaryMember] += balances[dependentId];
          balances[dependentId] = 0;
        }
      }
    }

    return balances;
  }

  function calculateSimplifiedSettlements(balances: Record<string, number>) {
    const settlements: { from: string; to: string; amount: number }[] = [];
    const creditors: { member: string; balance: number }[] = [];
    const debtors: { member: string; balance: number }[] = [];

    for (const [memberId, balance] of Object.entries(balances)) {
      if (balance > 0.01) creditors.push({ member: memberId, balance });
      else if (balance < -0.01) debtors.push({ member: memberId, balance });
    }
    creditors.sort((a, b) => b.balance - a.balance);
    debtors.sort((a, b) => a.balance - b.balance);

    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];
      const amount = Math.min(-debtor.balance, creditor.balance);
      settlements.push({
        from: debtor.member,
        to: creditor.member,
        amount: Math.round(amount * 100) / 100,
      });
      debtor.balance += amount;
      creditor.balance -= amount;
      if (Math.abs(debtor.balance) < 0.01) i++;
      if (Math.abs(creditor.balance) < 0.01) j++;
    }
    return settlements;
  }

  const balances = calculateBalances();
  const settlements = calculateSimplifiedSettlements(balances);

  // Calculate totals for the details table
  let totalAmount = 0;
  const memberTotals: Record<string, number> = {};
  if (group) {
    group.members.forEach(m => { memberTotals[m.id] = 0; });
    expenses.forEach(exp => {
      totalAmount += exp.amount;
      group.members.forEach(member => {
        const split = exp.split_between.find(s => s.member_id === member.id);
        let value = 0;
        if (exp.paid_by_member_id === member.id) {
          value = exp.amount;
        }
        if (split) {
          value -= split.amount;
        }
        memberTotals[member.id] += value;
      });
    });
  }

  // Add expense group handler
  async function handleAddExpenseGroup(e: React.FormEvent) {
    e.preventDefault();
    setExpenseGroupLoading(true);
    setExpenseGroupError(null);
    if (!expenseGroupName || selectedExpenseGroupMembers.length < 2 || !primaryMemberId) {
      setExpenseGroupError('Please provide a name, select at least 2 members, and choose a primary member.');
      setExpenseGroupLoading(false);
      return;
    }

    // Check if primary member is already in a group
    const isPrimaryInExistingGroup = group?.expense_groups?.some(g => 
      g.members.includes(primaryMemberId)
    );

    if (isPrimaryInExistingGroup) {
      setExpenseGroupError('The selected primary member is already in an expense group.');
      setExpenseGroupLoading(false);
      return;
    }

    try {
      const newExpenseGroup = {
        name: expenseGroupName,
        primary_member_id: primaryMemberId,
        members: selectedExpenseGroupMembers
      };

      const updatedExpenseGroups = [...(group?.expense_groups || []), newExpenseGroup];
      
      const { error } = await supabase
        .from('groups')
        .update({ expense_groups: updatedExpenseGroups })
        .eq('id', id);

      if (error) throw error;

      setGroup(prev => prev ? { ...prev, expense_groups: updatedExpenseGroups } : null);
      setExpenseGroupName('');
      setSelectedExpenseGroupMembers([]);
      setPrimaryMemberId('');
      setShowExpenseGroupModal(false);
    } catch (err) {
      setExpenseGroupError('Failed to add expense group.');
      console.error('Error adding expense group:', err);
    } finally {
      setExpenseGroupLoading(false);
    }
  }

  if (isLoading) {
    return (
      <main className="bg-main-gradient min-h-screen flex flex-col items-center px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
        </div>
      </main>
    );
  }

  if (error || !group) {
    return (
      <main className="bg-main-gradient min-h-screen flex flex-col items-center px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">{error || 'Group not found'}</h1>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="bg-main-gradient min-h-screen flex flex-col items-center px-4 pt-4 pb-8">
        <GroupHeader 
          name={group.name} 
          currency={group.currency} 
          members={group.members} 
          description={group.description}
          urls={group.url}
        />

        <AddExpenseModal
          show={showExpenseModal}
          onClose={() => setShowExpenseModal(false)}
          onSubmit={handleAddExpense}
          members={group.members}
          currency={group.currency}
          payer={payer}
          setPayer={setPayer}
          description={description}
          setDescription={setDescription}
          amount={amount}
          setAmount={setAmount}
          date={date}
          setDate={setDate}
          splitType={splitType}
          setSplitType={setSplitType}
          splitBetween={splitBetween}
          setSplitBetween={setSplitBetween}
          isLoading={expenseLoading}
          error={expenseError}
        />

        <ExpensesList
          expenses={expenses}
          currency={group.currency}
          showAllExpenses={showAllExpenses}
          onToggleShowAll={() => setShowAllExpenses(v => !v)}
          onEditExpense={(expense) => {
            setSelectedExpense(expense);
            setEditPayer(expense.paid_by_member_id);
            setEditDescription(expense.description);
            setEditAmount(expense.amount.toString());
            setEditDate(expense.date);
            setEditSplitBetween(expense.split_between.map(s => s.member_id));
            setEditError(null);
            setShowEditExpenseModal(true);
          }}
          onAddExpense={() => {
            setDate(new Date().toISOString().split('T')[0]);
            setShowExpenseModal(true);
          }}
          members={group.members}
        />

        <SettlementList
          expenses={expenses}
          settlements={settlements}
          currency={group.currency}
          onShowDetails={() => setShowDetailsModal(true)}
          members={group.members}
          expenseGroups={group.expense_groups || []}
          onAddExpenseGroup={() => setShowExpenseGroupModal(true)}
          onDeleteExpenseGroup={async (groupToDelete) => {
            try {
              const updatedExpenseGroups = group.expense_groups.filter(g => 
                g.primary_member_id !== groupToDelete.primary_member_id
              );
              
              const { error } = await supabase
                .from('groups')
                .update({ expense_groups: updatedExpenseGroups })
                .eq('id', id);

              if (error) throw error;

              setGroup(prev => prev ? { ...prev, expense_groups: updatedExpenseGroups } : null);
            } catch (err) {
              console.error('Error deleting expense group:', err);
            }
          }}
          groupName={group.name}
        />

        <DetailsModal
          show={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          expenses={expenses}
          members={group.members}
          currency={group.currency}
          totalAmount={totalAmount}
          memberTotals={memberTotals}
        />

        <EditExpenseModal
          show={showEditExpenseModal}
          onClose={() => setShowEditExpenseModal(false)}
          onSubmit={async (e) => {
            e.preventDefault();
            setEditLoading(true);
            setEditError(null);
            if (!editPayer || !editDescription || !editAmount || !editDate || editSplitBetween.length === 0) {
              setEditError('Please fill all fields and select at least one member to split.');
              setEditLoading(false);
              return;
            }
            try {
              const amountValue = parseFloat(editAmount);
              const share = amountValue / editSplitBetween.length;
              const splitBetweenData = editSplitBetween.map(memberId => ({
                member_id: memberId,
                amount: share
              }));

              const { error } = await supabase
                .from('expenses')
                .update({
                  paid_by_member_id: editPayer,
                  description: editDescription,
                  amount: amountValue,
                  split_between: splitBetweenData,
                  date: editDate,
                  created_at: new Date().toISOString(),
                })
                .eq('id', selectedExpense!.id);
              if (error) throw error;
              // Refresh expenses
              const { data: expensesData, error: expensesError } = await supabase
                .from('expenses')
                .select('*')
                .eq('group_id', selectedExpense!.group_id)
                .order('date', { ascending: false });
              if (expensesError) throw expensesError;
              setExpenses(expensesData || []);
              setShowEditExpenseModal(false);
            } catch (err) {
              setEditError('Failed to update expense.');
              console.error('Error updating expense:', err);
            } finally {
              setEditLoading(false);
            }
          }}
          onDelete={async () => {
            if (!window.confirm('Are you sure you want to delete this expense?')) return;
            setEditLoading(true);
            setEditError(null);
            try {
              const { error } = await supabase
                .from('expenses')
                .delete()
                .eq('id', selectedExpense!.id);
              if (error) throw error;
              // Refresh expenses
              const { data: expensesData, error: expensesError } = await supabase
                .from('expenses')
                .select('*')
                .eq('group_id', selectedExpense!.group_id)
                .order('date', { ascending: false });
              if (expensesError) throw expensesError;
              setExpenses(expensesData || []);
              setShowEditExpenseModal(false);
            } catch (err) {
              setEditError('Failed to delete expense.');
              console.error('Error deleting expense:', err);
            } finally {
              setEditLoading(false);
            }
          }}
          expense={selectedExpense}
          members={group.members}
          currency={group.currency}
          payer={editPayer}
          setPayer={setEditPayer}
          description={editDescription}
          setDescription={setEditDescription}
          amount={editAmount}
          setAmount={setEditAmount}
          date={editDate}
          setDate={setEditDate}
          splitType={editSplitType}
          setSplitType={setEditSplitType}
          splitBetween={editSplitBetween}
          setSplitBetween={setEditSplitBetween}
          isLoading={editLoading}
          error={editError}
        />

        <AddExpenseGroupModal
          show={showExpenseGroupModal}
          onClose={() => setShowExpenseGroupModal(false)}
          onSubmit={handleAddExpenseGroup}
          members={group.members}
          name={expenseGroupName}
          setName={setExpenseGroupName}
          primaryMemberId={primaryMemberId}
          setPrimaryMemberId={setPrimaryMemberId}
          selectedMembers={selectedExpenseGroupMembers}
          setSelectedMembers={setSelectedExpenseGroupMembers}
          isLoading={expenseGroupLoading}
          error={expenseGroupError}
          existingExpenseGroups={group.expense_groups || []}
        />
      </main>
      <Footer />
    </>
  );
} 