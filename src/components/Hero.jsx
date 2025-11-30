import { motion } from 'framer-motion';
import { profile, heroStats } from '../data/portfolio';
import { useCountUp } from '../hooks/useCountUp';

function StatCard({ stat, index }) {
  const { ref, displayValue } = useCountUp(stat.value, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-6 text-center hover:scale-[1.02] transition-transform duration-300"
    >
      <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
        {displayValue}
      </div>
      <div className="text-sm text-primary-600 dark:text-primary-400">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 via-transparent to-accent-500/5 dark:from-accent-500/10 dark:to-accent-500/5" />

      {/* Animated background circles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400 text-sm font-medium mb-6">
              {profile.tagline}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4"
          >
            <span className="text-primary-900 dark:text-white">{profile.name}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl font-semibold gradient-text mb-6"
          >
            {profile.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-primary-600 dark:text-primary-400 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <a href="#contact" className="btn-primary">
              Get In Touch
            </a>
            <a href="#projects" className="btn-secondary">
              View Projects
            </a>
          </motion.div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {heroStats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>

          {/* Location & Availability */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm text-primary-500 dark:text-primary-400"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {profile.location}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
