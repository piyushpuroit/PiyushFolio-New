import React, { useState, useEffect } from 'react';
import { getResume, updateResume } from '../../api/portfolioService';
import { useToast } from '../../components/Toast';

export default function ResumeManager() {
  const [downloadUrl, setDownloadUrl] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  const loadResume = async () => {
    setIsLoading(true);
    try {
      const data = await getResume();
      if (data) {
        setDownloadUrl(data.downloadUrl || '');
        setLastUpdated(data.lastUpdated || '');
      }
    } catch (err) {
      toast.show('Failed to load resume details', { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateResume({ id: 1, downloadUrl });
      toast.show('Resume metadata updated successfully', { type: 'success' });
      loadResume();
    } catch (err) {
      toast.show(err.message || 'Failed to update resume', { type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Manage Resume Link</h3>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading resume metadata...</div>
      ) : (
        <form onSubmit={handleSubmit} className="card-glass p-6 rounded-2xl border border-white/10 max-w-lg space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Resume Download URL *</label>
            <input
              type="text"
              required
              placeholder="https://drive.google.com/uc?export=download&id=..."
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-accent-start"
              value={downloadUrl}
              onChange={(e) => setDownloadUrl(e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-2">
              This URL will be tied to the "Resume" download button in the Hero section of the portfolio.
            </p>
          </div>

          {lastUpdated && (
            <div className="text-sm text-gray-400">
              Last Updated: <span className="text-gray-300 font-tech">{new Date(lastUpdated).toLocaleString()}</span>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded bg-accent-start hover:bg-accent-end text-white font-medium transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Update Resume Link'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
