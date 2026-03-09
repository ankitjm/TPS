import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Download, Upload, Plus, ArrowUp, ArrowDown, X, Smartphone, Mail, Play, ExternalLink, Lock } from 'lucide-react';
import { VideoItem, LogoItem, saveVideos, saveLogos, getVideos, getLogos, getInquiries, Inquiry } from '../lib/db';
import { defaultVideoData, defaultLogoData } from '../data/ourWorkData';

interface AdminProps {
  onBack: () => void;
}

const ADMIN_PASSWORD = 'phygital2025';

const Admin: React.FC<AdminProps> = ({ onBack }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [logos, setLogos] = useState<LogoItem[]>([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [editingLogo, setEditingLogo] = useState<LogoItem | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'videos' | 'logos' | 'inquiries'>('videos');

  // Check if mobile device - block access
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isAuthenticated && !isMobile) {
      const loadInitialData = async () => {
        try {
          const [videoData, logoData, inquiryData] = await Promise.all([
            getVideos(),
            getLogos(),
            getInquiries()
          ]);
          setVideos(videoData.length > 0 ? videoData : defaultVideoData);
          setLogos(logoData.length > 0 ? logoData : defaultLogoData);
          setInquiries(inquiryData);
        } catch (error) {
          console.error('Failed to load data:', error);
        }
      };
      loadInitialData();
    }
  }, [isAuthenticated, isMobile]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      setPassword('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await Promise.all([
        saveVideos(videos),
        saveLogos(logos)
      ]);
      alert('Changes saved successfully to Turso DB!');
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save changes. Check console.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    const data = { videos, logos, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `phygital-studio-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.videos && data.logos) {
          setIsSaving(true);
          await Promise.all([
            saveVideos(data.videos),
            saveLogos(data.logos)
          ]);
          setVideos(data.videos);
          setLogos(data.logos);
          alert('Data imported successfully to Turso DB!');
        } else {
          alert('Invalid file format');
        }
      } catch {
        alert('Error reading file');
      } finally {
        setIsSaving(false);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = async () => {
    if (confirm('Reset to default data? This will overwrite the database with defaults.')) {
      setIsSaving(true);
      try {
        await Promise.all([
          saveVideos(defaultVideoData),
          saveLogos(defaultLogoData)
        ]);
        setVideos(defaultVideoData);
        setLogos(defaultLogoData);
        alert('Database reset to defaults!');
      } catch (error) {
        alert('Reset failed.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  const moveVideo = (index: number, direction: 'up' | 'down') => {
    const newVideos = [...videos];
    if (direction === 'up' && index > 0) {
      [newVideos[index - 1], newVideos[index]] = [newVideos[index], newVideos[index - 1]];
    } else if (direction === 'down' && index < newVideos.length - 1) {
      [newVideos[index], newVideos[index + 1]] = [newVideos[index + 1], newVideos[index]];
    }
    setVideos(newVideos);
  };

  const deleteVideo = (id: string) => {
    if (confirm('Delete this video?')) {
      setVideos(videos.filter(v => v.id !== id));
    }
  };

  const saveVideo = (video: VideoItem) => {
    if (editingVideo) {
      setVideos(videos.map(v => v.id === editingVideo.id ? video : v));
      setEditingVideo(null);
    } else {
      setVideos([...videos, { ...video, id: Date.now().toString() }]);
    }
    setShowVideoModal(false);
  };

  const moveLogo = (index: number, direction: 'up' | 'down') => {
    const newLogos = [...logos];
    if (direction === 'up' && index > 0) {
      [newLogos[index - 1], newLogos[index]] = [newLogos[index], newLogos[index - 1]];
    } else if (direction === 'down' && index < newLogos.length - 1) {
      [newLogos[index], newLogos[index + 1]] = [newLogos[index + 1], newLogos[index]];
    }
    setLogos(newLogos);
  };

  const deleteLogo = (index: number) => {
    if (confirm('Delete this logo?')) {
      setLogos(logos.filter((_, i) => i !== index));
    }
  };

  const saveLogo = (logo: LogoItem) => {
    if (editingLogo) {
      const index = logos.findIndex(l => l === editingLogo);
      setLogos(logos.map((l, i) => i === index ? logo : l));
      setEditingLogo(null);
    } else {
      setLogos([...logos, logo]);
    }
    setShowLogoModal(false);
  };

  // Mobile restriction
  if (isMobile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 max-w-md w-full text-center"
        >
          <Smartphone className="w-16 h-16 text-white mx-auto mb-4" />
          <h2 className="text-2xl font-thin text-white mb-4">Mobile Access Restricted</h2>
          <p className="text-gray-400 mb-6">Admin panel is only available on desktop devices for security and better user experience.</p>
          <button
            onClick={onBack}
            className="w-full py-3 border border-white/20 rounded-full text-white hover:bg-white/10 transition-all"
          >
            Back to Site
          </button>
        </motion.div>
      </div>
    );
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 max-w-md w-full"
        >
          <div className="flex items-center justify-center mb-6">
            <Lock className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-thin text-white mb-6 text-center">Admin Access</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none mb-4"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-medium shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
            >
              Login
            </motion.button>
          </form>
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white hover:bg-white/10 transition-all duration-300"
          >
            Back to Site
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 sticky top-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-4 z-40 border-b border-white/10 px-2">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <h1 className="text-3xl font-thin text-white">Admin Panel</h1>
            <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-500 uppercase tracking-widest">Dashboard</span>
          </div>

          <div className="flex gap-2 flex-wrap justify-center">
            <motion.button
              onClick={handleSave}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSaving}
              className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full text-white text-sm font-medium flex items-center gap-2 transition-all shadow-lg hover:shadow-pink-500/25"
            >
              <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save All'}
            </motion.button>
            <motion.button
              onClick={handleExport}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 rounded-full text-white text-sm font-medium flex items-center gap-2 transition-all duration-300"
            >
              <Download className="w-4 h-4" /> Export
            </motion.button>
            <motion.label
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 rounded-full text-white text-sm font-medium flex items-center gap-2 transition-all duration-300 cursor-pointer"
            >
              <Upload className="w-4 h-4" /> Import
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </motion.label>
            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 rounded-full text-sm font-medium transition-all duration-300"
            >
              Reset
            </motion.button>
            <motion.button
              onClick={onBack}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
            >
              Exit
            </motion.button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 flex gap-2">
            {[
              { id: 'videos', label: 'YouTube Videos', icon: Play },
              { id: 'logos', label: 'Client Logos', icon: Smartphone },
              { id: 'inquiries', label: 'Inquiries', icon: Mail }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl flex items-center gap-2.5 transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-600/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'animate-pulse' : ''}`} />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'videos' && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-thin text-white">Video Management</h2>
                  <p className="text-gray-500 text-sm">Manage projects shown on the Our Work page</p>
                </div>
                <motion.button
                  onClick={() => {
                    setEditingVideo(null);
                    setShowVideoModal(true);
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl text-white flex items-center gap-2 transition-all shadow-lg hover:shadow-pink-500/25"
                >
                  <Plus className="w-5 h-5" /> Add Video
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.length === 0 ? (
                  <div className="col-span-full py-20 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
                    <Play className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-500">No videos found. Start by adding one!</p>
                  </div>
                ) : (
                  videos.map((video, index) => (
                    <div key={video.id} className="group bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/[0.07]">
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-white/5">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] text-pink-400 font-bold uppercase">
                          {video.category}
                        </div>
                      </div>
                      <h3 className="text-white font-medium text-lg mb-2 truncate">{video.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10">{video.description}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex gap-2">
                          <button
                            onClick={() => moveVideo(index, 'up')}
                            disabled={index === 0}
                            className="p-2 text-white/40 hover:text-white disabled:opacity-10 hover:bg-white/5 rounded-lg transition-all"
                            title="Move Up"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => moveVideo(index, 'down')}
                            disabled={index === videos.length - 1}
                            className="p-2 text-white/40 hover:text-white disabled:opacity-10 hover:bg-white/5 rounded-lg transition-all"
                            title="Move Down"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => { setEditingVideo(video); setShowVideoModal(true); }}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm transition-all border border-white/10"
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => deleteVideo(video.id)}
                            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm transition-all border border-red-500/20"
                          >
                            Delete
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'logos' && (
            <motion.div
              key="logos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-thin text-white">Logo Management</h2>
                  <p className="text-gray-500 text-sm">Update client logos displayed in the portfolio section</p>
                </div>
                <motion.button
                  onClick={() => {
                    setEditingLogo(null);
                    setShowLogoModal(true);
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl text-white flex items-center gap-2 transition-all shadow-lg hover:shadow-pink-500/25"
                >
                  <Plus className="w-5 h-5" /> Add Logo
                </motion.button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {logos.length === 0 ? (
                  <div className="col-span-full py-20 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
                    <Smartphone className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-500">No logos found. Add your client list!</p>
                  </div>
                ) : (
                  logos.map((logo, index) => (
                    <div key={index} className="group bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/[0.07] flex flex-col items-center">
                      <div className="w-full aspect-square bg-white rounded-xl flex items-center justify-center mb-4 p-4 shadow-inner relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        <img
                          src={logo.color_url || `/logos/${logo.folder}/color.${logo.folder === 'axiscades' ? 'jpeg' : 'png'}`}
                          alt={logo.name}
                          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.opacity = '0.2';
                          }}
                        />
                      </div>
                      <h3 className="text-white font-medium text-sm mb-4 truncate w-full text-center">{logo.name}</h3>

                      <div className="flex gap-2 w-full pt-4 border-t border-white/5">
                        <div className="flex flex-col gap-1">
                          <button onClick={() => moveLogo(index, 'up')} disabled={index === 0} className="p-2 text-white/40 hover:text-white disabled:opacity-10 hover:bg-white/5 rounded-lg transition-all">
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => moveLogo(index, 'down')} disabled={index === logos.length - 1} className="p-2 text-white/40 hover:text-white disabled:opacity-10 hover:bg-white/5 rounded-lg transition-all">
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => { setEditingLogo(logo); setShowLogoModal(true); }}
                            className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-xs transition-all border border-white/10"
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => deleteLogo(index)}
                            className="flex-1 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs transition-all border border-red-500/20"
                          >
                            Delete
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'inquiries' && (
            <motion.div
              key="inquiries"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-thin text-white">Customer Inquiries</h2>
                  <p className="text-gray-500 text-sm">Review responses from the Contact Us form</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                {inquiries.length === 0 ? (
                  <div className="py-20 text-center">
                    <Mail className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-500">No inquiries yet. When users submit the form, they will appear here.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/10">
                          <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Sender</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Message</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {inquiries.map((inquiry) => (
                          <tr key={inquiry.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {inquiry.created_at ? new Date(inquiry.created_at).toLocaleDateString() : 'N/A'}<br />
                              <span className="text-[10px] opacity-50">{inquiry.created_at ? new Date(inquiry.created_at).toLocaleTimeString() : ''}</span>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-white font-medium text-sm">{inquiry.name}</p>
                              <div className="flex flex-col gap-0.5 mt-1">
                                <a href={`mailto:${inquiry.email}`} className="text-pink-400 text-[11px] hover:underline flex items-center gap-1">
                                  <Mail className="w-3 h-3" /> {inquiry.email} <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                                {inquiry.phone && (
                                  <p className="text-gray-400 text-[11px] flex items-center gap-1">
                                    <Smartphone className="w-3 h-3 text-gray-500" /> {inquiry.phone}
                                  </p>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="max-w-md">
                                <p className="text-gray-300 text-sm line-clamp-2 italic group-hover:line-clamp-none transition-all duration-300 bg-black/20 p-3 rounded-xl border border-white/5">
                                  "{inquiry.message}"
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-3 py-1 bg-green-600/20 text-green-400 text-[10px] font-bold rounded-full uppercase tracking-tighter border border-green-500/20">
                                Received
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <VideoModal
                video={editingVideo || { id: '', title: '', description: '', thumbnail: '', url: '', category: '' }}
                onSave={saveVideo}
                onCancel={() => setShowVideoModal(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo Modal */}
      <AnimatePresence>
        {showLogoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowLogoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <LogoModal
                logo={editingLogo || { name: '', folder: '' }}
                onSave={saveLogo}
                onCancel={() => setShowLogoModal(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const VideoModal: React.FC<{
  video: VideoItem;
  onSave: (video: VideoItem) => void;
  onCancel: () => void;
}> = ({ video, onSave, onCancel }) => {
  const [formData, setFormData] = useState(video);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.url) {
      const youtubeId = formData.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
      if (youtubeId) {
        formData.thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
      }
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-thin text-white">{video.id ? 'Edit Video' : 'Add Video'}</h3>
        <button type="button" onClick={onCancel} className="text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      <input
        type="text"
        placeholder="Title *"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none"
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none"
        rows={3}
      />
      <input
        type="text"
        placeholder="YouTube URL *"
        value={formData.url}
        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
        className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none"
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none"
      />
      <div className="flex gap-3 pt-4">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg text-white font-medium shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
        >
          Save
        </motion.button>
        <motion.button
          type="button"
          onClick={onCancel}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 bg-white/10 border border-white/10 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300"
        >
          Cancel
        </motion.button>
      </div>
    </form>
  );
};

const LogoModal: React.FC<{
  logo: LogoItem;
  onSave: (logo: LogoItem) => void;
  onCancel: () => void;
}> = ({ logo, onSave, onCancel }) => {
  const [formData, setFormData] = useState(logo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && (formData.folder || formData.color_url || formData.white_url)) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-thin text-white">{logo.name ? 'Edit Logo' : 'Add Logo'}</h3>
        <button type="button" onClick={onCancel} className="text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      <input
        type="text"
        placeholder="Logo Name *"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none"
        required
      />
      <input
        type="text"
        placeholder="Color Logo URL (optional)"
        value={formData.color_url || ''}
        onChange={(e) => setFormData({ ...formData, color_url: e.target.value })}
        className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none"
      />
      <input
        type="text"
        placeholder="White Logo URL (optional)"
        value={formData.white_url || ''}
        onChange={(e) => setFormData({ ...formData, white_url: e.target.value })}
        className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none"
      />
      <p className="text-gray-400 text-xs text-center">OR use folder-based convention:</p>
      <input
        type="text"
        placeholder="Folder Name (e.g., adani-connex)"
        value={formData.folder}
        onChange={(e) => setFormData({ ...formData, folder: e.target.value })}
        className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none"
      />
      <p className="text-gray-400 text-xs">If URLs are empty, we look in /public/logos/[folder-name]/ for color.png and black-white.png</p>
      <div className="flex gap-3 pt-4">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg text-white font-medium shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
        >
          Save
        </motion.button>
        <motion.button
          type="button"
          onClick={onCancel}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 bg-white/10 border border-white/10 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300"
        >
          Cancel
        </motion.button>
      </div>
    </form>
  );
};

export default Admin;
