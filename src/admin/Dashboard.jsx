import React, { useEffect, useState } from 'react';
import MessagesTable from './MessagesTable';
import ProjectManager from './components/ProjectManager';
import SkillManager from './components/SkillManager';
import EducationManager from './components/EducationManager';
import ExperienceManager from './components/ExperienceManager';
import CertificationManager from './components/CertificationManager';
import ResumeManager from './components/ResumeManager';
import SocialLinkManager from './components/SocialLinkManager';

import { getContacts } from '../api/contactService';
import { useToast } from '../components/Toast';
import { MessageSquare, FolderGit2, Dumbbell, GraduationCap, Briefcase, Trophy, FileText, Share2, LogOut, LayoutDashboard } from 'lucide-react';

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({ total: 0, unread: 0 });
  const toast = useToast();

  const loadStats = async () => {
    try {
      const data = await getContacts();
      const arr = Array.isArray(data) ? data : [];
      const unread = arr.filter((m) => !m.read).length;
      setStats({ total: arr.length, unread });
    } catch (err) {
      toast.show('Failed to load stats', { type: 'error' });
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Dumbbell size={18} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={18} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
    { id: 'certifications', label: 'Certifications', icon: <Trophy size={18} /> },
    { id: 'resume', label: 'Resume link', icon: <FileText size={18} /> },
    { id: 'socials', label: 'Social links', icon: <Share2 size={18} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    onLogout();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0b0f19] text-white">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#070a13] border-r border-white/10 flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
              <span className="font-bold text-sm">A</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Admin Portal</h2>
          </div>
          
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-accent-start/20 text-accent-start border-l-4 border-accent-start'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto max-h-screen">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Dashboard Overview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-glass p-6 rounded-2xl border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-start/15 flex items-center justify-center text-accent-start">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase font-semibold">Total Messages</div>
                  <div className="text-3xl font-bold mt-1">{stats.total}</div>
                </div>
              </div>
              
              <div className="card-glass p-6 rounded-2xl border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500/15 flex items-center justify-center text-yellow-500">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase font-semibold">Unread Messages</div>
                  <div className="text-3xl font-bold mt-1">{stats.unread}</div>
                </div>
              </div>

              <div className="card-glass p-6 rounded-2xl border border-white/10 flex items-center gap-4 opacity-50">
                <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center text-green-500">
                  <LayoutDashboard size={24} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase font-semibold">Total Visits</div>
                  <div className="text-3xl font-bold mt-1">—</div>
                </div>
              </div>
            </div>

            <div className="card-glass p-6 rounded-2xl border border-white/10">
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MessageSquare size={20} className="text-accent-start" /> Contact Messages
              </h4>
              <MessagesTable onMessageChange={loadStats} />
            </div>
          </div>
        )}

        {activeTab === 'projects' && <ProjectManager />}
        {activeTab === 'skills' && <SkillManager />}
        {activeTab === 'education' && <EducationManager />}
        {activeTab === 'experience' && <ExperienceManager />}
        {activeTab === 'certifications' && <CertificationManager />}
        {activeTab === 'resume' && <ResumeManager />}
        {activeTab === 'socials' && <SocialLinkManager />}
      </main>
    </div>
  );
}
