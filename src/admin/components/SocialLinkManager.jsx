import React, { useState, useEffect } from 'react';
import { getSocialLinks, createSocialLink, updateSocialLink, deleteSocialLink } from '../../api/portfolioService';
import { useToast } from '../../components/Toast';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function SocialLinkManager() {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const toast = useToast();

  const [formData, setFormData] = useState({
    platformName: '',
    url: '',
    icon: '',
    displayOrder: 0
  });

  const loadLinks = async () => {
    setIsLoading(true);
    try {
      const data = await getSocialLinks();
      setLinks(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.show('Failed to load social links', { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const handleOpenAdd = () => {
    setEditingLink(null);
    setFormData({
      platformName: '',
      url: '',
      icon: '',
      displayOrder: 0
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (link) => {
    setEditingLink(link);
    setFormData({
      platformName: link.platformName || '',
      url: link.url || '',
      icon: link.icon || '',
      displayOrder: link.displayOrder || 0
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this social link?')) {
      try {
        await deleteSocialLink(id);
        toast.show('Social link deleted successfully', { type: 'success' });
        loadLinks();
      } catch (err) {
        toast.show(err.message || 'Failed to delete social link', { type: 'error' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLink) {
        await updateSocialLink(editingLink.id, formData);
        toast.show('Social link updated successfully', { type: 'success' });
      } else {
        await createSocialLink(formData);
        toast.show('Social link created successfully', { type: 'success' });
      }
      setIsModalOpen(false);
      loadLinks();
    } catch (err) {
      toast.show(err.message || 'Failed to save social link', { type: 'error' });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Manage Social Links</h3>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 rounded bg-accent-start hover:bg-accent-end text-white font-medium transition-colors"
        >
          <Plus size={16} /> Add Link
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading social links...</div>
      ) : links.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No social links found. Add one!</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Platform</th>
                <th className="py-3 px-4">URL</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">{link.displayOrder}</td>
                  <td className="py-3 px-4 font-semibold">{link.platformName}</td>
                  <td className="py-3 px-4 text-sm text-gray-400">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-accent-start">
                      {link.url}
                    </a>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleOpenEdit(link)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(link.id)}
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
          <div className="card-glass w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h4 className="text-lg font-bold">{editingLink ? 'Edit Social Link' : 'Add Social Link'}</h4>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Platform Name *</label>
                <input
                  type="text"
                  required
                  placeholder="GitHub / LinkedIn / Twitter"
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                  value={formData.platformName}
                  onChange={(e) => setFormData({ ...formData, platformName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/username"
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Icon Identifier</label>
                  <input
                    type="text"
                    placeholder="GitHub / LinkedIn"
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
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
                  {editingLink ? 'Save Changes' : 'Create Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
