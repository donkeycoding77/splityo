"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { supabase } from '@/lib/supabase';

const currencyOptions = [
  { label: 'US Dollar ($)', value: '$' },
  { label: 'Euro (€)', value: '€' },
  { label: 'British Pound (£)', value: '£' },
  { label: 'Japanese Yen (¥)', value: '¥' },
  { label: 'Indian Rupee (₹)', value: '₹' },
  { label: 'Canadian Dollar (C$)', value: 'C$' },
  { label: 'Australian Dollar (A$)', value: 'A$' },
];

export default function CreateGroupPage() {
  const router = useRouter();
  const [members, setMembers] = useState<string[]>([]);
  const [newMember, setNewMember] = useState('');
  const [groupName, setGroupName] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [description, setDescription] = useState('');
  const [urls, setUrls] = useState<{ title: string; url: string }[]>([]);
  const [newUrlTitle, setNewUrlTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMemberChange = (idx: number, value: string) => {
    setMembers(members => members.map((m, i) => (i === idx ? value : m)));
  };

  const handleAddMember = () => {
    const trimmed = newMember.trim();
    if (trimmed && !members.includes(trimmed)) {
      setMembers([...members, trimmed]);
      setNewMember('');
    }
  };

  const handleAddUrl = () => {
    if (newUrlTitle.trim() && newUrl.trim()) {
      setUrls([...urls, { title: newUrlTitle.trim(), url: newUrl.trim() }]);
      setNewUrlTitle('');
      setNewUrl('');
    }
  };

  const handleRemoveUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Prevent submission if group name is empty or less than 2 members
    if (!groupName.trim() || members.length < 2) {
      setError('Please enter a group name and add at least 2 members.');
      setIsLoading(false);
      return;
    }

    try {
      // Filter out empty member names
      const validMembers = members.filter(m => m.trim() !== '');

      // Build members array as [{ id, name }]
      const membersArray = validMembers.map((name, idx) => ({
        id: (idx + 1).toString(),
        name,
      }));

      // Create the group in Supabase
      const { data: group, error: groupError } = await supabase
        .from('groups')
        .insert([
          {
            name: groupName,
            currency,
            members: membersArray,
            description: description.trim() || null,
            url: urls.length > 0 ? urls : null,
            created_at: new Date().toISOString(),
          }
        ])
        .select()
        .single();

      if (groupError) throw groupError;

      // Redirect to the group page
      router.push(`/group/${group.id}`);
    } catch (err) {
      setError('Failed to create group. Please try again.');
      console.error('Error creating group:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-main-gradient min-h-screen flex flex-col items-center px-4 py-8 font-sans">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl flex items-center justify-center bebas-neue-regular">
        <span className="text-2xl sm:text-4xl">💸&nbsp;&nbsp;</span>
        <span className="text-pink-500">split</span>
        <span>yo</span>
        <span className="text-green-500">.cash</span>
        <span className="text-2xl sm:text-4xl">&nbsp;&nbsp;💸</span>
        </h1>

        <div className="w-full max-w-md mt-2">
            <Link href="/" className="inline-flex items-center gap-2 text-green-500 hover:text-pink-500 font-bold text-lg transition-colors">
                <span className="text-2xl">←</span> Back
            </Link>
        </div>

        <div className="w-full max-w-md card shadow-2xl mt-2">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-base font-bold mb-1 text-gray-800">
              Group Name <span className="text-pink-400">*</span>
            </label>
            <input
              type="text"
              className="input-main"
              placeholder="e.g. Taco Tuesday Crew 🌮"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              disabled={isLoading}
              maxLength={32}
            />
          </div>

          <div>
            <label className="block text-base font-bold mb-1 text-gray-800">
              Currency <span className="text-green-500">*</span>
            </label>
            <Menu as="div" className="relative w-full">
              <Menu.Button 
                className="input-main bg-white flex justify-between items-center w-full px-4 py-2 text-left font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
                disabled={isLoading}
              >
                <span>{currencyOptions.find(opt => opt.value === currency)?.label}</span>
                <ChevronDownIcon className="w-5 h-5 text-gray-400 ml-2" aria-hidden="true" />
              </Menu.Button>
              <Menu.Items className="absolute z-10 mt-2 w-full origin-top-left rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="py-1">
                  {currencyOptions.map(opt => (
                    <Menu.Item key={opt.value}>
                      {({ active }) => (
                        <button
                          type="button"
                          className={`block w-full text-left px-4 py-2 text-base font-medium text-gray-700 transition-colors ${active ? 'bg-green-50 text-green-600' : ''}`}
                          onClick={() => setCurrency(opt.value)}
                        >
                          {opt.label}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Menu>
          </div>

          <div>
            <label className="block text-base font-bold mb-1 text-gray-800">
              Members <span className="text-orange-400">*</span>
            </label>
            <div className="flex w-full">
              <input
                type="text"
                className="input-main flex-1 border-0"
                placeholder="Member Name"
                value={newMember}
                onChange={e => setNewMember(e.target.value)}
                disabled={isLoading}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddMember(); } }}
                maxLength={20}
              />
              <button
                type="button"
                className="bg-green-400 hover:bg-pink-400 text-white font-bold px-4 rounded-lg transition-colors"
                onClick={handleAddMember}
                disabled={isLoading || !newMember.trim()}
              >
                Add
              </button>
            </div>
            {members.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-2">
                {members.map((member, idx) => (
                  <span key={idx} className="flex items-center rounded-2xl border border-pink-200 bg-white pl-3 pr-2 py-1 text-gray-700 text-lg shadow-sm">
                    <span className="mr-2">{member}</span>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-pink-500 text-xl focus:outline-none"
                      aria-label={`Remove ${member}`}
                      onClick={() => setMembers(members.filter((_, i) => i !== idx))}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-base font-bold mb-1 text-gray-800">
              Description <span className="text-gray-400 text-sm font-normal">(optional)</span>
            </label>
            <textarea
              className="input-main min-h-[100px]"
              placeholder="Add a description for your group..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              disabled={isLoading}
              maxLength={500}
            />
          </div>

          <div>
            <label className="block text-base font-bold mb-1 text-gray-800">
              Links <span className="text-gray-400 text-sm font-normal">(optional)</span>
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input-main flex-1"
                  placeholder="Link Title"
                  value={newUrlTitle}
                  onChange={e => setNewUrlTitle(e.target.value)}
                  disabled={isLoading}
                  maxLength={50}
                />
                <input
                  type="url"
                  className="input-main flex-1"
                  placeholder="URL"
                  value={newUrl}
                  onChange={e => setNewUrl(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="bg-green-400 hover:bg-pink-400 text-white font-bold px-4 rounded-lg transition-colors"
                  onClick={handleAddUrl}
                  disabled={isLoading || !newUrlTitle.trim() || !newUrl.trim()}
                >
                  Add
                </button>
              </div>
              {urls.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {urls.map((url, idx) => (
                    <span key={idx} className="flex items-center rounded-2xl border border-pink-200 bg-white pl-3 pr-2 py-1 text-gray-700 text-sm shadow-sm">
                      <a href={url.url} target="_blank" rel="noopener noreferrer" className="mr-2 hover:text-pink-500">
                        {url.title}
                      </a>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-pink-500 text-xl focus:outline-none"
                        onClick={() => handleRemoveUrl(idx)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
                type="submit"
                className="btn-main w-auto bebas-neue-regular mt-2"
                disabled={isLoading || !groupName.trim() || members.length < 2}
            >
            {isLoading ? 'Creating...' : 'Create Group 🎉'}
            </button>
            </form>
        </div>
    </main>
  );
} 