import { useEffect } from 'react';

interface AddExpenseGroupModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  members: { id: string; name: string }[];
  name: string;
  setName: (name: string) => void;
  primaryMemberId: string;
  setPrimaryMemberId: (id: string) => void;
  selectedMembers: string[];
  setSelectedMembers: (members: string[]) => void;
  isLoading: boolean;
  error: string | null;
  existingExpenseGroups: { primary_member_id: string; members: string[] }[];
}

export default function AddExpenseGroupModal({
  show,
  onClose,
  onSubmit,
  members,
  name,
  setName,
  primaryMemberId,
  setPrimaryMemberId,
  selectedMembers,
  setSelectedMembers,
  isLoading,
  error,
  existingExpenseGroups
}: AddExpenseGroupModalProps) {
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

  if (!show) return null;

  // Get all members who are already in an expense group
  const membersInExistingGroups = new Set(
    existingExpenseGroups.flatMap(group => group.members)
  );

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
          <h2 className="text-xl font-bold mb-2 text-pink-500">Add Expense Group</h2>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div>
              <label className="block font-semibold mb-1">Group Name</label>
              <input
                className="input-main"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                disabled={isLoading}
                placeholder="e.g. Family Expenses"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Members</label>
              <div className="flex flex-col gap-2">
                {members.map((member) => {
                  const isInExistingGroup = membersInExistingGroups.has(member.id);
                  return (
                    <div key={member.id} className={`flex items-center gap-2 ${isInExistingGroup ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(member.id)}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectedMembers([...selectedMembers, member.id]);
                          } else {
                            setSelectedMembers(selectedMembers.filter(id => id !== member.id));
                            if (primaryMemberId === member.id) {
                              setPrimaryMemberId('');
                            }
                          }
                        }}
                        disabled={isInExistingGroup}
                      />
                      <span>{member.name}</span>
                      {selectedMembers.includes(member.id) && !isInExistingGroup && (
                        <label className="flex items-center gap-1 ml-2">
                          <input
                            type="radio"
                            name="primaryMember"
                            checked={primaryMemberId === member.id}
                            onChange={() => setPrimaryMemberId(member.id)}
                            className="form-radio h-4 w-4 text-pink-500"
                          />
                          <span className="text-xs text-pink-500">Primary</span>
                        </label>
                      )}
                      {isInExistingGroup && (
                        <span className="text-xs text-gray-400">(Already in a group)</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white rounded-full font-semibold text-sm py-2 px-4 transition-colors w-full"
                disabled={isLoading || !primaryMemberId}
              >
                {isLoading ? 'Adding...' : 'Add Group'}
              </button>
            </div>
          </form>
        </div>
        <br />
      </div>
    </div>
  );
} 