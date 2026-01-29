'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { dealAPI, claimAPI } from '@/lib/api';
import { Deal, Claim } from '@/types';
import { isAuthenticated } from '@/lib/auth';

export default function DealDetailsPage() {
  const [deal, setDeal] = useState<Deal | null>(null);
  const [claimStatus, setClaimStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const params = useParams();
  const dealId = params.id as string;

  useEffect(() => {
    const fetchDealDetails = async () => {
      try {
        const response = await dealAPI.getDealById(dealId);
        setDeal(response.deal);

        if (isAuthenticated()) {
          const statusResponse = await claimAPI.getClaimStatus(dealId);
          setClaimStatus(statusResponse);
        }
      } catch (err: any) {
        setError('Failed to load deal details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (dealId) {
      fetchDealDetails();
    }
  }, [dealId]);

  const handleClaimDeal = async () => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    setClaiming(true);
    setError('');

    try {
      await claimAPI.claimDeal(dealId);
      setSuccess('Deal claimed successfully!');
      setClaimStatus({ claimed: true, status: 'approved' });
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to claim deal';
      setError(errorMsg);
      
      if (err.response?.status === 403) {
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      }
    } finally {
      setClaiming(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-xl">Deal not found</p>
        <Link href="/deals" className="text-primary hover:text-secondary transition-colors">
          Back to Deals
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/deals"
            className="inline-flex items-center text-primary hover:text-secondary transition-colors gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Deals
          </Link>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-dark/50 backdrop-blur border border-primary/20 rounded-lg overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 border-b border-primary/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{deal.title}</h1>
                <p className="text-xl text-gray-400">{deal.partner}</p>
              </div>
              {deal.featured && (
                <span className="px-4 py-2 bg-secondary/20 text-secondary font-semibold rounded-lg">
                  Featured Deal
                </span>
              )}
            </div>

            {deal.accessLevel === 'restricted' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm font-semibold"
              >
                ⚠️ Requires Email Verification
              </motion.div>
            )}
          </div>

          {/* Content Grid */}
          <div className="p-8 space-y-8">
            {/* Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm"
              >
                {success}
              </motion.div>
            )}

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">About This Deal</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{deal.description}</p>
            </div>

            {/* Benefits and Terms */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-4">🎁 What You Get</h3>
                <p className="text-gray-300 leading-relaxed">{deal.benefit}</p>
              </div>

              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-secondary mb-4">💰 Discount</h3>
                <p className="text-4xl font-bold text-secondary mb-2">{deal.discount}</p>
                <p className="text-gray-300 text-sm">Exclusive for StartupBenefits members</p>
              </div>
            </div>

            {/* Category and Expiry */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border border-primary/30 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Category</p>
                <p className="text-lg font-semibold text-primary capitalize">{deal.category}</p>
              </div>

              {deal.expiryDate && (
                <div className="p-4 border border-primary/30 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Expires</p>
                  <p className="text-lg font-semibold">
                    {new Date(deal.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            {/* Eligibility */}
            {deal.eligibilityRequirements && deal.eligibilityRequirements.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">📋 Eligibility Requirements</h3>
                <ul className="space-y-3">
                  {deal.eligibilityRequirements.map((req, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <span className="text-primary font-bold mt-1">✓</span>
                      <span>{req}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-primary/20 bg-dark/30 flex flex-col gap-4">
            {claimStatus?.claimed ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 font-semibold">
                  ✓ You have claimed this deal ({claimStatus.status})
                </div>
                <Link
                  href="/dashboard"
                  className="block text-center px-6 py-3 bg-primary/20 text-primary font-semibold rounded-lg hover:bg-primary/30 transition-colors"
                >
                  View in Dashboard
                </Link>
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClaimDeal}
                disabled={claiming}
                className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all disabled:opacity-50 text-lg"
              >
                {claiming ? 'Claiming...' : 'Claim This Deal'}
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
