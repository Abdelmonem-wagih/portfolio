/* ===================================================================
   CONFIGURATION
=================================================================== */
const GITHUB_USERNAME = 'Abdelmonem-wagih';
const GITHUB_API_BASE  = 'https://api.github.com';

const TYPING_STRINGS = [
    'Mobile App Developer',
    'Flutter Specialist',
    'Cross-Platform Expert',
    'UI/UX Enthusiast',
    'Problem Solver'
];

/* ===================================================================
   TYPING ANIMATION
=================================================================== */
function initTypingAnimation() {
    const el = document.getElementById('typing-text');
    if (!el) return;

    let strIdx = 0, charIdx = 0, isDeleting = false, paused = false;

    function tick() {
        const str = TYPING_STRINGS[strIdx];
        el.textContent = str.substring(0, charIdx);

        if (!isDeleting) {
            charIdx++;
            if (charIdx > str.length) {
                paused = true;
                setTimeout(() => { paused = false; isDeleting = true; tick(); }, 2000);
                return;
            }
        } else {
            charIdx--;
            if (charIdx < 0) {
                isDeleting = false;
                strIdx = (strIdx + 1) % TYPING_STRINGS.length;
                charIdx = 0;
            }
        }

        if (!paused) {
            setTimeout(tick, isDeleting ? 80 : 130 + Math.random() * 40);
        }
    }

    tick();
}

/* ===================================================================
   NAVIGATION
=================================================================== */
function initNavigation() {
    const nav     = document.getElementById('nav');
    const toggle  = document.querySelector('.nav-toggle');
    const mobile  = document.querySelector('.nav-mobile');
    const links   = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (toggle && mobile) {
        toggle.addEventListener('click', () => {
            mobile.classList.toggle('open');
        });
    }

    // Smooth scroll + close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            if (mobile) mobile.classList.remove('open');
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Nav shadow on scroll + active link
    window.addEventListener('scroll', () => {
        nav.style.boxShadow = window.scrollY > 20
            ? '0 1px 24px rgba(0, 0, 0, 0.4)'
            : '';
        updateActiveNavLink();
    }, { passive: true });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 80) current = s.id;
    });

    links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

/* ===================================================================
   SCROLL REVEAL (IntersectionObserver)
=================================================================== */
function initScrollReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ===================================================================
   GITHUB API
=================================================================== */
async function fetchGitHubData() {
    const container = document.getElementById('github-projects-container');
    if (!container) return;

    try {
        const res = await fetch(
            `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const repos = await res.json();

        const hiddenRepos = ['Portfolio', 'portfolio', 'ToDo', 'Sahra', 'ShopEasy'];

        const filtered = repos
            .filter(r => !r.fork && r.name !== GITHUB_USERNAME && !hiddenRepos.includes(r.name))
            .filter(r => r.stargazers_count > 0 || r.updated_at > '2022-01-01')
            .slice(0, 6);

        const withLangs = await Promise.all(filtered.map(async repo => {
            try {
                const lr = await fetch(
                    `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repo.name}/languages`
                );
                const langs = lr.ok ? await lr.json() : {};
                return { ...repo, primaryLanguage: Object.keys(langs)[0] || repo.language || 'Unknown' };
            } catch {
                return { ...repo, primaryLanguage: repo.language || 'Unknown' };
            }
        }));

        renderGitHubProjects(withLangs);

    } catch (err) {
        console.error('GitHub fetch error:', err);
        container.innerHTML = `
            <div class="error-placeholder">
                <i class="fas fa-exclamation-triangle"></i>
                <span>Could not load GitHub repositories.</span>
            </div>
        `;
    }
}

function renderGitHubProjects(repos) {
    const container = document.getElementById('github-projects-container');

    if (!repos.length) {
        container.innerHTML = `
            <div class="empty-placeholder">
                <i class="fab fa-github"></i>
                <span>No repositories found.</span>
            </div>
        `;
        return;
    }

    container.innerHTML = repos.map(createRepoCard).join('');
}

function createRepoCard(repo) {
    const langColors = {
        Dart: '#00D2B8', JavaScript: '#F7DF1E', TypeScript: '#007ACC',
        Python: '#3776AB', Java: '#ED8B00', 'C++': '#00599C',
        HTML: '#E34F26', CSS: '#1572B6', Swift: '#FA7343', Kotlin: '#0095D5'
    };

    const lang  = repo.primaryLanguage || 'Unknown';
    const color = langColors[lang] || '#64748b';
    const date  = new Date(repo.updated_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short'
    });

    return `
        <div class="github-card">
            <div class="github-header">
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="github-title">
                    <i class="fab fa-github"></i>${repo.name}
                </a>
                <div class="github-stats">
                    <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                    <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                </div>
            </div>
            <p class="github-description">${repo.description || 'No description.'}</p>
            <div class="github-footer">
                <div class="github-language">
                    <span class="language-dot" style="background:${color}"></span>${lang}
                </div>
                <span class="github-updated">${date}</span>
            </div>
        </div>
    `;
}

/* ===================================================================
   KEYBOARD ACCESSIBILITY
=================================================================== */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelector('.nav-mobile')?.classList.remove('open');
    }
});

/* ===================================================================
   ERROR HANDLING
=================================================================== */
window.addEventListener('error', e => console.error('Portfolio error:', e.error));
window.addEventListener('unhandledrejection', e => {
    console.error('Unhandled rejection:', e.reason);
    e.preventDefault();
});

/* ===================================================================
   INIT
=================================================================== */
function init() {
    initTypingAnimation();
    initNavigation();
    initScrollReveal();
    document.body.classList.add('loaded');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

window.Portfolio = { updateActiveNavLink };

