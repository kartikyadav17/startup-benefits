'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { dealAPI } from '@/lib/api';
import { Deal } from '@/types';

const CATEGORIES = ['all', 'cloud', 'marketing', 'analytics', 'productivity', 'design', 'development'];

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [accessLevel, setAccessLevel] = useState('all');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch deals
  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      try {
        const response = await dealAPI.getAllDeals({
          category: category !== 'all' ? category : undefined,
          search: debouncedSearch || undefined,
          accessLevel: accessLevel !== 'all' ? accessLevel : undefined,
        });
        setDeals(response.deals);
      } catch (error) {
        console.error('Failed to fetch deals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [category, debouncedSearch, accessLevel]);

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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Available Deals</h1>
          <p className="text-gray-400">Explore exclusive SaaS deals and benefits for your startup</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-6"
        >
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search deals by name, description, or partner..."
              className="w-full px-6 py-3 bg-dark border border-primary/30 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-500 transition-colors"
            />
            <svg
              className="absolute right-4 top-3.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">Category</label>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    category === cat
                      ? 'bg-primary text-white'
                      : 'bg-dark border border-primary/30 text-gray-300 hover:border-primary/60'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Access Level Filter */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">Deal Type</label>
            <div className="flex gap-3">
              {['all', 'public', 'restricted'].map((level) => (
                <motion.button
                  key={level}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAccessLevel(level)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    accessLevel === level
                      ? 'bg-secondary text-white'
                      : 'bg-dark border border-secondary/30 text-gray-300 hover:border-secondary/60'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Deals Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading ? (
            // Skeleton loaders
            [...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-dark/50 border border-primary/20 rounded-lg p-6 space-y-4 animate-pulse"
              >
                <div className="h-6 bg-primary/20 rounded w-3/4"></div>
                <div className="h-4 bg-primary/20 rounded w-full"></div>
                <div className="h-4 bg-primary/20 rounded w-5/6"></div>
                <div className="h-10 bg-primary/20 rounded"></div>
              </motion.div>
            ))
          ) : deals.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="col-span-full text-center py-12"
            >
              <p className="text-gray-400 text-lg">No deals found matching your filters.</p>
            </motion.div>
          ) : (
            deals.map((deal) => (
              <motion.div
                key={deal._id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group bg-dark/50 backdrop-blur border border-primary/20 rounded-lg overflow-hidden hover:border-primary/50 transition-all"
              >
                {/* Deal Header */}
                <div className="p-6 border-b border-primary/20">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {deal.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">{deal.partner}</p>
                    </div>
                    {deal.featured && (
                      <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs font-semibold rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  {deal.accessLevel === 'restricted' && (
                    <div className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold rounded">
                      Requires Verification
                    </div>
                  )}
                </div>

                {/* Deal Body */}
                <div className="p-6 space-y-4">
                  <p className="text-gray-400 text-sm line-clamp-2">{deal.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 rounded p-3">
                      <p className="text-xs text-gray-400 mb-1">Discount</p>
                      <p className="text-lg font-bold text-primary">{deal.discount}</p>
                    </div>
                    <div className="bg-secondary/10 rounded p-3">
                      <p className="text-xs text-gray-400 mb-1">Category</p>
                      <p className="text-lg font-bold text-secondary capitalize">
                        {deal.category}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400">{deal.benefit}</p>
                </div>

                {/* Deal Footer */}
                <div className="p-6 border-t border-primary/20">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={`/deals/${deal._id}`}
                      className="block w-full text-center px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all"
                    >
                      View Details
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
