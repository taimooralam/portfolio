import { motion } from 'framer-motion';
import { experience } from '../data/portfolio';

function ExperienceItem({ exp, index, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-8"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-700" />
      )}

      {/* Timeline dot */}
      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>

      <div className="glass-card p-6 ml-4 hover:scale-[1.01] transition-transform duration-300">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-lg font-semibold text-primary-900 dark:text-white">
              {exp.role}
            </h3>
            <p className="text-accent-500 font-medium">{exp.company}</p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-700 text-sm font-medium">
              {exp.period}
            </span>
            <p className="text-sm text-primary-500 dark:text-primary-400 mt-1">
              {exp.location}
            </p>
          </div>
        </div>

        <ul className="space-y-2">
          {exp.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-primary-600 dark:text-primary-400">
              <svg className="w-4 h-4 text-accent-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-primary-100/50 dark:bg-primary-800/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-heading text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <div className="w-20 h-1 bg-accent-500 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {experience.map((exp, index) => (
            <ExperienceItem
              key={exp.company + exp.period}
              exp={exp}
              index={index}
              isLast={index === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
