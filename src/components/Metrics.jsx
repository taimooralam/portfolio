import { motion } from 'framer-motion';
import { featuredMetrics } from '../data/portfolio';
import { useCountUp } from '../hooks/useCountUp';

function MetricCard({ metric, index, size = 'normal' }) {
  const { ref, displayValue } = useCountUp(metric.value, 2000);

  const sizeClasses = {
    large: 'md:col-span-2 md:row-span-2',
    normal: '',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`glass-card p-6 flex flex-col justify-between group hover:scale-[1.02] transition-all duration-300 ${sizeClasses[size]}`}
    >
      <div>
        <div className={`font-bold gradient-text mb-2 ${size === 'large' ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
          {displayValue}
        </div>
        <div className={`font-semibold text-primary-900 dark:text-white ${size === 'large' ? 'text-lg' : 'text-base'}`}>
          {metric.label}
        </div>
      </div>
      <div className={`text-primary-500 dark:text-primary-400 mt-2 ${size === 'large' ? 'text-base' : 'text-sm'}`}>
        {metric.context}
      </div>

      {/* Decorative element */}
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <svg className={`${size === 'large' ? 'w-16 h-16' : 'w-10 h-10'} text-accent-500`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      </div>
    </motion.div>
  );
}

export default function Metrics() {
  return (
    <section id="metrics" className="py-20 bg-primary-100/50 dark:bg-primary-800/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-heading text-3xl md:text-4xl font-bold mb-4">Impact by Numbers</h2>
          <p className="text-primary-600 dark:text-primary-400 mb-6">
            Production AI — measured, not claimed
          </p>
          <div className="w-20 h-1 bg-accent-500 mx-auto rounded-full" />
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {/* Large featured metric */}
          <MetricCard metric={featuredMetrics[0]} index={0} size="large" />

          {/* Regular metrics */}
          {featuredMetrics.slice(1, 4).map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index + 1} />
          ))}

          {/* Second row */}
          {featuredMetrics.slice(4, 6).map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index + 4} />
          ))}

          {/* Large featured metric */}
          <MetricCard metric={featuredMetrics[6]} index={6} size="large" />

          {/* Last metric */}
          {featuredMetrics.slice(7).map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index + 7} />
          ))}
        </div>
      </div>
    </section>
  );
}
