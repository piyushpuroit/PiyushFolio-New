import React, { useState, useEffect } from 'react';
import { getContacts, deleteContact, markRead } from '../api/contactService';
import { useToast } from '../components/Toast';

function MessageRow({ msg, onDelete, onToggleRead }) {
  return (
    <tr className={`transition-colors ${msg.read ? 'bg-white/5' : ''}`}>
      <td className="px-3 py-2 text-sm">{msg.id}</td>
      <td className="px-3 py-2 text-sm">{msg.name}</td>
      <td className="px-3 py-2 text-sm">{msg.email}</td>
      <td className="px-3 py-2 text-sm break-words max-w-md">{msg.message}</td>
      <td className="px-3 py-2 text-sm">
        <button onClick={() => onToggleRead(msg)} className="mr-2 px-3 py-1 rounded bg-white/5">{msg.read ? 'Mark unread' : 'Mark read'}</button>
        <button onClick={() => onDelete(msg)} className="px-3 py-1 rounded bg-red-600 text-white">Delete</button>
      </td>
    </tr>
  );
}

export default function MessagesTable({ onMessageChange }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const toast = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const data = await getContacts();
      setMessages(Array.isArray(data) ? data.reverse() : []);
    } catch (err) {
      toast.show('Failed to load messages', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (msg) => {
    if (!confirm('Delete this message?')) return;
    try {
      await deleteContact(msg.id);
      setMessages((s) => s.filter((m) => m.id !== msg.id));
      toast.show('Deleted', { type: 'success' });
      if (onMessageChange) onMessageChange();
    } catch (err) {
      toast.show('Delete failed', { type: 'error' });
    }
  };

  const handleToggleRead = async (msg) => {
    try {
      const updated = await markRead(msg.id, !msg.read);
      setMessages((s) => s.map((m) => (m.id === msg.id ? { ...m, read: updated.read ?? !m.read } : m)));
      toast.show('Updated', { type: 'success' });
      if (onMessageChange) onMessageChange();
    } catch (err) {
      toast.show('Update failed', { type: 'error' });
    }
  };

  const filtered = messages.filter((m) => {
    if (filter === 'unread') return !m.read;
    if (filter === 'read') return m.read;
    return true;
  }).filter((m) => (m.name + m.email + m.message).toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <input placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} className="px-3 py-2 rounded bg-white/5" />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 rounded bg-white/5">
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
        <div>
          <button onClick={load} className="px-3 py-2 rounded bg-[#0f0f0f] border border-[#00f2fe]/40">Refresh</button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          <div className="h-12 bg-white/5 rounded" />
          <div className="h-12 bg-white/5 rounded" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left border-collapse">
            <thead>
              <tr className="text-xs text-gray-400">
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Message</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="p-6 text-center text-gray-400">No messages found.</td></tr>
              ) : filtered.map((m) => (
                <MessageRow key={m.id} msg={m} onDelete={handleDelete} onToggleRead={handleToggleRead} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
