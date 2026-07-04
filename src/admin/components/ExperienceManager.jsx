import React, { useState, useEffect } from 'react';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../../api/portfolioService';
import { useToast } from '../../components/Toast';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function ExperienceManager() {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const toast = useToast();

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    displayOrder: 0
  });

  const loadExperiences = async () => {
    setIsLoading(true);
    try {
      const data = await getExperiences();
      setExperiences(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.show('Failed to load experience records', { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleOpenAdd = () => {
    setEditingExp(null);
    setFormData({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      displayOrder: 0
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exp) => {
    setEditingExp(exp);
    setFormData({
      company: exp.company || '',
      position: exp.position || '',
      location: exp.location || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      current: exp.current || false,
      description: exp.description || '',
      displayOrder: exp.displayOrder || 0
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience record?')) {
      try {
        await deleteExperience(id);
        toast.show('Experience record deleted successfully', { type: 'success' });
        loadExperiences();
      } catch (err) {
        toast.show(err.message || 'Failed to delete record', { type: 'error' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingExp) {
        await updateExperience(editingExp.id, formData);
        toast.show('Experience record updated successfully', { type: 'success' });
      } else {
        await createExperience(formData);
        toast.show('Experience record created successfully', { type: 'success' });
      }
      setIsModalOpen(false);
      loadExperiences();
    } catch (err) {
      toast.show(err.message || 'Failed to save experience record', { type: 'error' });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Manage Experience</h3>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 rounded bg-accent-start hover:bg-accent-end text-white font-medium transition-colors"
        >
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading experience...</div>
      ) : experiences.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No experience records found. Add one!</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Position</th>
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((exp) => (
                <tr key={exp.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">{exp.displayOrder}</td>
                  <td className="py-3 px-4 font-semibold">{exp.company}</td>
                  <td className="py-3 px-4 text-sm text-gray-400">{exp.position}</td>
                  <td className="py-3 px-4 text-sm">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleOpenEdit(exp)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-glass w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h4 className="text-lg font-bold">{editingExp ? 'Edit Experience' : 'Add Experience'}</h4>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Position *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="Remote / City, Country"
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Display Order</label>
                  <input
                    type="number"
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Start Date *</label>
                  <input
                    type="text"
                    required
                    placeholder="June 2025"
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">End Date</label>
                  <input
                    type="text"
                    disabled={formData.current}
                    placeholder="Present / June 2026"
                    className="w-full bg-white/5 disabled:opacity-50 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                    value={formData.current ? 'Present' : formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="current"
                  className="w-4 h-4 text-accent-start focus:ring-0 bg-transparent border-white/20 rounded"
                  checked={formData.current}
                  onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: e.target.checked ? 'Present' : '' })}
                />
                <label htmlFor="current" className="text-sm text-gray-300">Currently work here</label>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Description (Bullet points newline-separated)</label>
                <textarea
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-accent-start hover:bg-accent-end text-white font-medium transition-colors"
                >
                  {editingExp ? 'Save Changes' : 'Create Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
