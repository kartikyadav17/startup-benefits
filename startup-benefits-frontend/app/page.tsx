'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const features = [
    {
      title: 'Exclusive Deals',
      description: 'Access premium SaaS tools at discounted rates exclusively for startups',
      icon: '🎯',
    },
    {
      title: 'Verified Benefits',
      description: 'Every deal is carefully vetted to ensure maximum value for your startup',
      icon: '✓',
    },
    {
      title: 'One-Click Claiming',
      description: 'Simple process to claim deals and start using them immediately',
      icon: '⚡',
    },
    {
      title: 'Dashboard Tracking',
      description: 'Track all your claimed deals and their status from one place',
      icon: '📊',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center relative overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(circle at ${scrollY * 0.1}% 50%, rgba(0, 102, 255, 0.1), transparent)`,
          backgroundSize: '200% 200%',
        }}
      >
        {/* Animated background elements */}
        <motion.div
          animate={{ y: scrollY * 0.5 }}
          className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10"
        />
        <motion.div
          animate={{ y: scrollY * -0.3 }}
          className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10"
        />

        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full"
                >
                  <p className="text-primary text-sm font-semibold">Welcome to StartupBenefits</p>
                </motion.div>

                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    SaaS Deals
                  </span>
                  {' '}for
                  <span className="text-white"> Ambitious Startups</span>
                </h1>
              </div>

              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-400 leading-relaxed"
              >
                Get exclusive access to premium tools and services at startup-friendly prices. Access verified deals on cloud services, marketing tools, analytics platforms, and more.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/deals"
                    className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-primary/50 transition-all"
                  >
                    Explore Deals
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/auth/register"
                    className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-all"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-4 pt-8"
              >
                {[
                  { number: '500+', label: 'Deals' },
                  { number: '5000+', label: 'Startups' },
                  { number: '$10M+', label: 'Savings' },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-2xl font-bold text-primary">{stat.number}</p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Animated Element */}
            <motion.div
              variants={itemVariants}
              className="w-full"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative"
              >
                <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border border-primary/30 p-8 backdrop-blur-sm shadow-lg shadow-primary/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 rounded-2xl" />
                  <div className="relative space-y-6">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                        className="h-4 bg-gradient-to-r from-primary to-secondary rounded opacity-30"
                        style={{ width: `${100 - i * 15}%` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-dark/30 backdrop-blur"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose StartupBenefits?</h2>
            <p className="text-gray-400 text-lg">
              Everything you need to access premium tools and services
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10, shadow: '0 20px 40px rgba(0,102,255,0.2)' }}
                className="p-6 rounded-lg border border-primary/20 bg-dark/50 backdrop-blur hover:border-primary/50 transition-all group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-2xl p-12 text-center backdrop-blur"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Access Exclusive Deals?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Join thousands of startups already saving money with premium tools.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/auth/register"
                className="inline-block px-10 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-primary/50 transition-all"
              >
                Get Started Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
