import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolio';

const allDomains = [...new Set(projects.flatMap(p => p.domains))].sort();

function ProjectCard({ project, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass-card overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-1">
              {project.title}
            </h3>
            <p className="text-sm text-accent-500 font-medium">
              {project.company} | {project.period}
            </p>
          </div>

          {/* Key Metric Badge */}
          <div className="text-center px-4 py-2 rounded-lg bg-accent-500/10 border border-accent-500/20">
            <div className="text-xl font-bold gradient-text">{project.keyMetric.value}</div>
            <div className="text-xs text-primary-600 dark:text-primary-400">{project.keyMetric.label}</div>
          </div>
        </div>

        {/* Domain Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.domains.map((domain) => (
            <span key={domain} className="domain-tag">
              {domain}
            </span>
          ))}
        </div>

        {/* Situation Preview */}
        <p className="text-sm text-primary-600 dark:text-primary-400 mb-4 line-clamp-2">
          {project.situation}
        </p>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-medium text-accent-500 hover:text-accent-600 transition-colors"
        >
          {isExpanded ? 'Show Less' : 'View STAR Details'}
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>

        {/* Expanded STAR Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-primary-200 dark:border-primary-700 space-y-4">
                {/* Situation */}
                <div>
                  <h4 className="text-sm font-semibold text-primary-900 dark:text-white mb-1 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center text-xs font-bold">S</span>
                    Situation
                  </h4>
                  <p className="text-sm text-primary-600 dark:text-primary-400 pl-8">
                    {project.situation}
                  </p>
                </div>

                {/* Task */}
                <div>
                  <h4 className="text-sm font-semibold text-primary-900 dark:text-white mb-1 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center text-xs font-bold">T</span>
                    Task
                  </h4>
                  <p className="text-sm text-primary-600 dark:text-primary-400 pl-8">
                    {project.task}
                  </p>
                </div>

                {/* Actions */}
                <div>
                  <h4 className="text-sm font-semibold text-primary-900 dark:text-white mb-1 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs font-bold">A</span>
                    Actions
                  </h4>
                  <ul className="text-sm text-primary-600 dark:text-primary-400 pl-8 space-y-1">
                    {project.actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent-500 mt-1">-</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Results */}
                <div>
                  <h4 className="text-sm font-semibold text-primary-900 dark:text-white mb-1 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center text-xs font-bold">R</span>
                    Results
                  </h4>
                  <ul className="text-sm text-primary-600 dark:text-primary-400 pl-8 space-y-1">
                    {project.results.map((result, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1">
                    {project.skills.map((skill) => (
                      <span key={skill} className="skill-tag text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedDomain, setSelectedDomain] = useState('All');

  const filteredProjects = selectedDomain === 'All'
    ? projects
    : projects.filter(p => p.domains.includes(selectedDomain));

  return (
    <section id="projects" className="py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-heading text-3xl md:text-4xl font-bold mb-4">Projects & Achievements</h2>
          <p className="text-primary-600 dark:text-primary-400 mb-6">
            STAR-formatted evidence of impact and technical leadership
          </p>
          <div className="w-20 h-1 bg-accent-500 mx-auto rounded-full" />
        </motion.div>

        {/* Domain Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          <button
            onClick={() => setSelectedDomain('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedDomain === 'All'
                ? 'bg-accent-500 text-white'
                : 'bg-primary-100 dark:bg-primary-800 hover:bg-primary-200 dark:hover:bg-primary-700'
            }`}
          >
            All ({projects.length})
          </button>
          {allDomains.slice(0, 8).map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedDomain === domain
                  ? 'bg-accent-500 text-white'
                  : 'bg-primary-100 dark:bg-primary-800 hover:bg-primary-200 dark:hover:bg-primary-700'
              }`}
            >
              {domain}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
