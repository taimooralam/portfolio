import { profile } from '../data/portfolio';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-primary-200 dark:border-primary-800">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-primary-600 dark:text-primary-400">
            &copy; {currentYear} {profile.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`https://${profile.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-primary-100 dark:bg-primary-800 hover:bg-primary-200 dark:hover:bg-primary-700 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="p-2 rounded-lg bg-primary-100 dark:bg-primary-800 hover:bg-primary-200 dark:hover:bg-primary-700 transition-colors"
              aria-label="Email"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
