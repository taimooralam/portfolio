// Technical Lead Portfolio - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSmoothScrolling();
    initContactForm();
    initSkills();
    initExperience();
    initProjects();
    initScrollAnimations();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Highlight active navigation item based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Initialize skills section
function initSkills() {
    const skillsData = [
        { name: 'JavaScript', level: 'Expert' },
        { name: 'React', level: 'Expert' },
        { name: 'Node.js', level: 'Advanced' },
        { name: 'TypeScript', level: 'Advanced' },
        { name: 'Python', level: 'Intermediate' },
        { name: 'AWS', level: 'Intermediate' },
        { name: 'Docker', level: 'Advanced' },
        { name: 'CI/CD', level: 'Advanced' }
    ];
    
    const skillsGrid = document.querySelector('.skills-grid');
    
    skillsData.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <h3>${skill.name}</h3>
            <p>${skill.level}</p>
        `;
        skillsGrid.appendChild(skillItem);
    });
}

// Initialize experience section
function initExperience() {
    const experienceData = [
        {
            title: 'Senior Technical Lead',
            company: 'Tech Company Inc.',
            duration: '2022 - Present',
            description: 'Leading development teams and architecting scalable solutions.'
        },
        {
            title: 'Senior Software Engineer',
            company: 'Previous Company',
            duration: '2020 - 2022',
            description: 'Developed and maintained web applications using modern technologies.'
        },
        {
            title: 'Software Engineer',
            company: 'Startup Co.',
            duration: '2018 - 2020',
            description: 'Built full-stack applications and contributed to product development.'
        }
    ];
    
    const experienceTimeline = document.querySelector('.experience-timeline');
    
    experienceData.forEach(exp => {
        const experienceItem = document.createElement('div');
        experienceItem.className = 'experience-item';
        experienceItem.innerHTML = `
            <h3>${exp.title}</h3>
            <div class="company">${exp.company}</div>
            <div class="duration">${exp.duration}</div>
            <p>${exp.description}</p>
        `;
        experienceTimeline.appendChild(experienceItem);
    });
}

// Initialize projects section
function initProjects() {
    const projectsData = [
        {
            title: 'E-commerce Platform',
            description: 'Built a scalable e-commerce solution with React and Node.js.',
            tech: 'React, Node.js, MongoDB',
            links: [
                { text: 'Live Demo', url: '#' },
                { text: 'GitHub', url: '#' }
            ]
        },
        {
            title: 'Team Management Tool',
            description: 'Developed a project management application for remote teams.',
            tech: 'Vue.js, Express, PostgreSQL',
            links: [
                { text: 'Live Demo', url: '#' },
                { text: 'GitHub', url: '#' }
            ]
        },
        {
            title: 'API Gateway',
            description: 'Designed and implemented a microservices API gateway.',
            tech: 'Node.js, Docker, AWS',
            links: [
                { text: 'Documentation', url: '#' },
                { text: 'GitHub', url: '#' }
            ]
        }
    ];
    
    const projectsGrid = document.querySelector('.projects-grid');
    
    projectsData.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p><strong>Technologies:</strong> ${project.tech}</p>
                <div class="project-links">
                    ${project.links.map(link => 
                        `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.text}</a>`
                    ).join('')}
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectItem);
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.skill-item, .experience-item, .project-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}, 250));