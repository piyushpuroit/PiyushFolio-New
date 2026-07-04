import React, { useState, useEffect } from 'react';
import { getCertifications, createCertification, updateCertification, deleteCertification } from '../../api/portfolioService';
import { useToast } from '../../components/Toast';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function CertificationManager() {
  const [certifications, setCertifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    issuingOrganization: '',
    issueDate: '',
    expirationDate: '',
    credentialId: '',
    credentialUrl: '',
    displayOrder: 0
  });

  const loadCertifications = async () => {
    setIsLoading(true);
    try {
      const data = await getCertifications();
      setCertifications(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.show('Failed to load certification records', { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCertifications();
  }, []);

  const handleOpenAdd = () => {
    setEditingCert(null);
    setFormData({
      name: '',
      issuingOrganization: '',
      issueDate: '',
      expirationDate: '',
      credentialId: '',
      credentialUrl: '',
      displayOrder: 0
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setEditingCert(cert);
    setFormData({
      name: cert.name || '',
      issuingOrganization: cert.issuingOrganization || '',
      issueDate: cert.issueDate || '',
      expirationDate: cert.expirationDate || '',
      credentialId: cert.credentialId || '',
      credentialUrl: cert.credentialUrl || '',
      displayOrder: cert.displayOrder || 0
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this achievement/certification?')) {
      try {
        await deleteCertification(id);
        toast.show('Achievement deleted successfully', { type: 'success' });
        loadCertifications();
      } catch (err) {
        toast.show(err.message || 'Failed to delete certification', { type: 'error' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCert) {
        await updateCertification(editingCert.id, formData);
        toast.show('Achievement updated successfully', { type: 'success' });
      } else {
        await createCertification(formData);
        toast.show('Achievement created successfully', { type: 'success' });
      }
      setIsModalOpen(false);
      loadCertifications();
    } catch (err) {
      toast.show(err.message || 'Failed to save certification', { type: 'error' });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Manage Achievements & Certifications</h3>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 rounded bg-accent-start hover:bg-accent-end text-white font-medium transition-colors"
        >
          <Plus size={16} /> Add Achievement
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading achievements...</div>
      ) : certifications.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No achievements found. Add one!</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Name / Title</th>
                <th className="py-3 px-4">Issuer</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((cert) => (
                <tr key={cert.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">{cert.displayOrder}</td>
                  <td className="py-3 px-4 font-semibold">{cert.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-400">{cert.issuingOrganization}</td>
                  <td className="py-3 px-4 text-sm">{cert.issueDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleOpenEdit(cert)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(cert.id)}
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
              <h4 className="text-lg font-bold">{editingCert ? 'Edit Achievement' : 'Add Achievement'}</h4>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Achievement/Cert Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Winner - CCC Hackathon 2024"
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Issuing Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="IIT Bikaner / IEEE"
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                    value={formData.issuingOrganization}
                    onChange={(e) => setFormData({ ...formData, issuingOrganization: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Issue Date *</label>
                  <input
                    type="text"
                    required
                    placeholder="2026 / March 2026"
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Expiration Date</label>
                  <input
                    type="text"
                    placeholder="2028 / Never"
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                    value={formData.expirationDate}
                    onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Credential ID / Subtitle</label>
                  <input
                    type="text"
                    placeholder="GATE Score: 423 / UI/UX Designer"
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                    value={formData.credentialId}
                    onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Credential URL</label>
                  <input
                    type="text"
                    placeholder="https://verify.link"
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                    value={formData.credentialUrl}
                    onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                  />
                </div>
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
                  {editingCert ? 'Save Changes' : 'Create Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
