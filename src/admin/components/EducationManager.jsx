import React, { useState, useEffect } from 'react';
import { getEducation, createEducation, updateEducation, deleteEducation } from '../../api/portfolioService';
import { useToast } from '../../components/Toast';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function EducationManager() {
  const [education, setEducation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);
  const toast = useToast();

  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    grade: '',
    description: '',
    displayOrder: 0
  });

  const loadEducation = async () => {
    setIsLoading(true);
    try {
      const data = await getEducation();
      setEducation(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.show('Failed to load academic records', { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEducation();
  }, []);

  const handleOpenAdd = () => {
    setEditingEdu(null);
    setFormData({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      grade: '',
      description: '',
      displayOrder: 0
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (edu) => {
    setEditingEdu(edu);
    setFormData({
      institution: edu.institution || '',
      degree: edu.degree || '',
      fieldOfStudy: edu.fieldOfStudy || '',
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      grade: edu.grade || '',
      description: edu.description || '',
      displayOrder: edu.displayOrder || 0
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this education record?')) {
      try {
        await deleteEducation(id);
        toast.show('Education record deleted successfully', { type: 'success' });
        loadEducation();
      } catch (err) {
        toast.show(err.message || 'Failed to delete record', { type: 'error' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEdu) {
        await updateEducation(editingEdu.id, formData);
        toast.show('Academic record updated successfully', { type: 'success' });
      } else {
        await createEducation(formData);
        toast.show('Academic record created successfully', { type: 'success' });
      }
      setIsModalOpen(false);
      loadEducation();
    } catch (err) {
      toast.show(err.message || 'Failed to save academic record', { type: 'error' });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Manage Education</h3>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 rounded bg-accent-start hover:bg-accent-end text-white font-medium transition-colors"
        >
          <Plus size={16} /> Add Education
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading education...</div>
      ) : education.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No education history found. Add one!</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Institution</th>
                <th className="py-3 px-4">Degree</th>
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {education.map((edu) => (
                <tr key={edu.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">{edu.displayOrder}</td>
                  <td className="py-3 px-4 font-semibold">{edu.institution}</td>
                  <td className="py-3 px-4 text-sm text-gray-400">{edu.degree} ({edu.fieldOfStudy})</td>
                  <td className="py-3 px-4 text-sm">{edu.startDate} – {edu.endDate || 'Present'}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleOpenEdit(edu)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(edu.id)}
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
              <h4 className="text-lg font-bold">{editingEdu ? 'Edit Education' : 'Add Education'}</h4>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Institution *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Level / Category *</label>
                  <input
                    type="text"
                    required
                    placeholder="College (B.Tech) / Secondary (10th)"
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                    value={formData.fieldOfStudy}
                    onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Degree / Role *</label>
                  <input
                    type="text"
                    required
                    placeholder="Computer Science & Engineering / School Topper"
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Grade</label>
                  <input
                    type="text"
                    placeholder="CGPA: 9.33 / 10"
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Start Date *</label>
                  <input
                    type="text"
                    required
                    placeholder="2023 or Sep 2023"
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">End Date</label>
                  <input
                    type="text"
                    placeholder="2027 or Present"
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
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

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Highlights (Newline separated)</label>
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
                  {editingEdu ? 'Save Changes' : 'Create Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
