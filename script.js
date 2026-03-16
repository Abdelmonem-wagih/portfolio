// ===== CONFIGURATION ===== 
const GITHUB_USERNAME = 'Abdelmonem-wagih';
const GITHUB_API_BASE = 'https://api.github.com';
const TYPING_STRINGS = [
    'Flutter Developer',
    'Mobile App Developer', 
    'Cross-Platform Expert',
    'UI/UX Enthusiast',
    'Problem Solver'
];

// ===== GLOBAL VARIABLES =====
let particleCanvas, particleCtx;
let particles = [];
let animationFrameId;

// ===== PARTICLE SYSTEM =====
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.life = 1;
        this.decay = Math.random() * 0.01 + 0.005;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.opacity = this.life;

        // Wrap around screen
        if (this.x > window.innerWidth) this.x = 0;
        if (this.x < 0) this.x = window.innerWidth;
        if (this.y > window.innerHeight) this.y = 0;
        if (this.y < 0) this.y = window.innerHeight;
    }

    draw() {
        if (this.life <= 0) return;
        
        particleCtx.save();
        particleCtx.globalAlpha = this.opacity;
        particleCtx.fillStyle = '#3b82f6';
        particleCtx.beginPath();
        particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        particleCtx.fill();
        particleCtx.restore();
    }
}

function initParticles() {
    particleCanvas = document.getElementById('particleCanvas');
    if (!particleCanvas) return;
    
    particleCtx = particleCanvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create initial particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
        ));
    }
    
    animateParticles();
}

function animateParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    
    // Update and draw particles
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        
        // Remove dead particles
        if (particle.life <= 0) {
            particles.splice(index, 1);
            // Add new particle
            particles.push(new Particle(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            ));
        }
    });
    
    // Draw connections between nearby particles
    drawConnections();
    
    animationFrameId = requestAnimationFrame(animateParticles);
}

function drawConnections() {
    particles.forEach((particle1, index) => {
        particles.slice(index + 1).forEach(particle2 => {
            const distance = Math.hypot(particle1.x - particle2.x, particle1.y - particle2.y);
            
            if (distance < 100) {
                const opacity = (100 - distance) / 100 * 0.3;
                particleCtx.save();
                particleCtx.globalAlpha = opacity;
                particleCtx.strokeStyle = '#3b82f6';
                particleCtx.lineWidth = 1;
                particleCtx.beginPath();
                particleCtx.moveTo(particle1.x, particle1.y);
                particleCtx.lineTo(particle2.x, particle2.y);
                particleCtx.stroke();
                particleCtx.restore();
            }
        });
    });
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    const cursor = document.querySelector('.typing-cursor');
    
    if (!typingText) return;
    
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function type() {
        const currentString = TYPING_STRINGS[stringIndex];
        
        if (!isDeleting) {
            typingText.textContent = currentString.substring(0, charIndex);
            charIndex++;
            
            if (charIndex > currentString.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                }, 2000);
            }
        } else {
            typingText.textContent = currentString.substring(0, charIndex);
            charIndex--;
            
            if (charIndex < 0) {
                isDeleting = false;
                stringIndex = (stringIndex + 1) % TYPING_STRINGS.length;
                charIndex = 0;
            }
        }
        
        if (!isPaused) {
            const speed = isDeleting ? 100 : 150;
            setTimeout(type, speed + Math.random() * 50);
        }
    }
    
    type();
}

// ===== NAVIGATION =====
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Scroll behavior for navigation
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class
        if (currentScrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
        
        lastScrollY = currentScrollY;
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when skills section is visible
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('section, .project-card, .timeline-item, .skill-category');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, index * 200);
    });
}

// ===== GITHUB API INTEGRATION =====
async function fetchGitHubData() {
    const container = document.getElementById('github-projects-container');
    if (!container) return;
    
    try {
        // Show loading state
        container.innerHTML = `
            <div class="loading-placeholder">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Loading GitHub projects...</span>
            </div>
        `;
        
        // Fetch user repositories
        const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const repos = await response.json();
        
        // Filter and sort repositories
        const filteredRepos = repos
            .filter(repo => !repo.fork && repo.name !== GITHUB_USERNAME) // Exclude forks and profile repo
            .filter(repo => repo.stargazers_count > 0 || repo.updated_at > '2022-01-01') // Recent or starred repos
            .slice(0, 6); // Limit to 6 repos
        
        // Fetch languages for each repository
        const reposWithLanguages = await Promise.all(
            filteredRepos.map(async (repo) => {
                try {
                    const langResponse = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repo.name}/languages`);
                    const languages = langResponse.ok ? await langResponse.json() : {};
                    
                    const primaryLanguage = Object.keys(languages)[0] || repo.language || 'Unknown';
                    
                    return {
                        ...repo,
                        primaryLanguage,
                        languages
                    };
                } catch (error) {
                    console.error(`Error fetching languages for ${repo.name}:`, error);
                    return {
                        ...repo,
                        primaryLanguage: repo.language || 'Unknown',
                        languages: {}
                    };
                }
            })
        );
        
        // Render repositories
        renderGitHubProjects(reposWithLanguages);
        
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        container.innerHTML = `
            <div class="error-placeholder">
                <i class="fas fa-exclamation-triangle"></i>
                <span>Failed to load GitHub projects</span>
                <p>Please check your internet connection and try again.</p>
            </div>
        `;
    }
}

function renderGitHubProjects(repos) {
    const container = document.getElementById('github-projects-container');
    
    if (repos.length === 0) {
        container.innerHTML = `
            <div class="empty-placeholder">
                <i class="fab fa-github"></i>
                <span>No public repositories found</span>
            </div>
        `;
        return;
    }
    
    const reposHTML = repos.map(repo => createRepoCard(repo)).join('');
    container.innerHTML = reposHTML;
}

function createRepoCard(repo) {
    const languageColors = {
        'Dart': '#00D2B8',
        'JavaScript': '#F7DF1E',
        'TypeScript': '#007ACC',
        'Python': '#3776AB',
        'Java': '#ED8B00',
        'C++': '#00599C',
        'HTML': '#E34F26',
        'CSS': '#1572B6',
        'Swift': '#FA7343',
        'Kotlin': '#0095D5'
    };
    
    const primaryLanguage = repo.primaryLanguage || 'Unknown';
    const languageColor = languageColors[primaryLanguage] || '#6B7280';
    
    const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    return `
        <div class="github-card">
            <div class="github-header">
                <a href="${repo.html_url}" target="_blank" class="github-title">
                    <i class="fab fa-github"></i>
                    ${repo.name}
                </a>
                <div class="github-stats">
                    <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                    <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                </div>
            </div>
            <p class="github-description">
                ${repo.description || 'No description available'}
            </p>
            <div class="github-footer">
                <div class="github-language">
                    <span class="language-dot" style="background-color: ${languageColor}"></span>
                    ${primaryLanguage}
                </div>
                <span class="github-updated">Updated ${updatedDate}</span>
            </div>
        </div>
    `;
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Create mailto link
        const mailtoLink = `mailto:abdowagih38@gmail.com?subject=${encodeURIComponent(data.subject + ' - Portfolio Contact')}&body=${encodeURIComponent(
            `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
        )}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Message composed! Your email client should open automatically.', 'success');
        
        // Reset form
        form.reset();
    });
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-lg);
        padding: 1rem 1.5rem;
        color: var(--text-primary);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        box-shadow: var(--shadow-xl);
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.contains(notification)) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        padding: 0.25rem;
        border-radius: var(--radius-sm);
        transition: var(--transition-fast);
    }
    
    .notification-close:hover {
        color: var(--text-primary);
        background: var(--bg-tertiary);
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// ===== UTILITY FUNCTIONS =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizePerformance() {
    // Optimize scroll events
    const optimizedScrollHandler = throttle(() => {
        updateActiveNavLink();
    }, 100);
    
    window.addEventListener('scroll', optimizedScrollHandler);
    
    // Optimize resize events
    const optimizedResizeHandler = debounce(() => {
        if (particleCanvas) {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        }
    }, 250);
    
    window.addEventListener('resize', optimizedResizeHandler);
}

// ===== INITIALIZATION =====
function init() {
    // Initialize all components
    initParticles();
    initTypingAnimation();
    initNavigation();
    initScrollAnimations();
    initContactForm();
    optimizePerformance();
    
    // Fetch GitHub data
    fetchGitHubData();
    
    // Add loading completion class
    document.body.classList.add('loaded');
}

// Wait for DOM content to be loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== ADDITIONAL FEATURES =====

// Add smooth reveal animations for elements
function addRevealAnimations() {
    const revealElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category');
    
    revealElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize reveal animations after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addRevealAnimations, 1000);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Add focus management for accessibility
function initAccessibility() {
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--accent)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
    
    // Show user-friendly error message for critical failures
    if (e.error && e.error.message.includes('particles')) {
        console.log('Particle animation disabled due to error');
        // Disable particle animation
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault(); // Prevent console error
});

// Export functions for potential external use
window.Portfolio = {
    showNotification,
    updateActiveNavLink,
    animateSkillBars
};