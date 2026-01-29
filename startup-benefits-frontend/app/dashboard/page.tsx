'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { claimAPI, authAPI } from '@/lib/api';
import { Claim } from '@/types';
import { isAuthenticated } from '@/lib/auth';

export default function DashboardPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    company: '',
    website: '',
  });
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { user, loading: userLoading } = useAuth();

  useEffect(() => {
    if (!userLoading && !isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    const fetchClaims = async () => {
      try {
        const response = await claimAPI.getUserClaims();
        setClaims(response.claims);
      } catch (error) {
        console.error('Failed to fetch claims:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchClaims();
      setProfileData({
        name: user.name,
        company: user.company || '',
        website: user.website || '',
      });
    }
  }, [user, userLoading, router]);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await authAPI.updateProfile(profileData);
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (userLoading || loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const approvedClaims = claims.filter(c => c.status === 'approved');
  const pendingClaims = claims.filter(c => c.status === 'pending');
  const rejectedClaims = claims.filter(c => c.status === 'rejected');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your profile and claimed deals</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - Profile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-dark/50 backdrop-blur border border-primary/20 rounded-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Your Profile</h2>

              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-dark border border-primary/30 rounded focus:outline-none focus:border-primary text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      value={profileData.company}
                      onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                      className="w-full px-4 py-2 bg-dark border border-primary/30 rounded focus:outline-none focus:border-primary text-white"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Website</label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                      className="w-full px-4 py-2 bg-dark border border-primary/30 rounded focus:outline-none focus:border-primary text-white"
                      placeholder="https://yoursite.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="py-2 bg-primary text-white rounded font-semibold hover:bg-primary/80 transition-colors disabled:opacity-50"
                    >
                      Save
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setEditMode(false)}
                      className="py-2 bg-dark border border-primary/30 text-gray-300 rounded font-semibold hover:border-primary/60 transition-colors"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Name</p>
                    <p className="text-lg font-semibold">{user.name}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Email</p>
                    <p className="text-gray-300">{user.email}</p>
                  </div>

                  {user.company && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Company</p>
                      <p className="text-gray-300">{user.company}</p>
                    </div>
                  )}

                  {user.website && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Website</p>
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-secondary transition-colors break-all"
                      >
                        {user.website}
                      </a>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Status</p>
                    <p className={`text-sm font-semibold ${user.isVerified ? 'text-green-400' : 'text-yellow-400'}`}>
                      {user.isVerified ? '✓ Verified' : '⚠ Unverified'}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setEditMode(true)}
                    className="w-full mt-4 py-2 bg-primary/20 text-primary rounded font-semibold hover:bg-primary/30 transition-colors"
                  >
                    Edit Profile
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Main Content - Claims */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Stats */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-4"
            >
              {[
                { label: 'Approved', value: approvedClaims.length, color: 'from-green-500 to-emerald-500' },
                { label: 'Pending', value: pendingClaims.length, color: 'from-yellow-500 to-orange-500' },
                { label: 'Total', value: claims.length, color: 'from-primary to-secondary' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={`bg-gradient-to-br ${stat.color} bg-opacity-10 border border-opacity-30 rounded-lg p-4`}
                >
                  <p className="text-xs text-gray-400 uppercase font-semibold">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Approved Claims */}
            {approvedClaims.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-green-400">✓</span> Approved Deals
                </h3>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3"
                >
                  {approvedClaims.map((claim) => (
                    <motion.div
                      key={claim._id}
                      variants={itemVariants}
                      className="bg-dark/50 border border-green-500/30 rounded-lg p-4 hover:border-green-500/60 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg">{claim.deal.title}</h4>
                          <p className="text-sm text-gray-400">{claim.deal.partner}</p>
                          <p className="text-sm text-green-400 mt-2">Claimed on {new Date(claim.claimedAt).toLocaleDateString()}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                          Approved
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Pending Claims */}
            {pendingClaims.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-yellow-400">⏳</span> Pending Approval
                </h3>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3"
                >
                  {pendingClaims.map((claim) => (
                    <motion.div
                      key={claim._id}
                      variants={itemVariants}
                      className="bg-dark/50 border border-yellow-500/30 rounded-lg p-4 hover:border-yellow-500/60 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg">{claim.deal.title}</h4>
                          <p className="text-sm text-gray-400">{claim.deal.partner}</p>
                          <p className="text-sm text-yellow-400 mt-2">Claimed on {new Date(claim.claimedAt).toLocaleDateString()}</p>
                        </div>
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-full">
                          Pending
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Empty State */}
            {claims.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-dark/50 border border-primary/20 rounded-lg p-12 text-center"
              >
                <p className="text-gray-400 text-lg mb-6">You haven't claimed any deals yet.</p>
                <Link
                  href="/deals"
                  className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/80 transition-colors"
                >
                  Explore Deals
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
