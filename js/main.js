/***********************************************
 * Init & helpers
 ***********************************************/
document.getElementById('year').textContent = new Date().getFullYear();
AOS.init({ once: true, easing: 'ease-out-cubic', duration: 700 });

// Typing timeout cleanup variable
let typingTimeout = null;

// Global variables for pagination
let visibleProjectsCount = 6;
let currentFilter = 'all';
let currentSearch = '';

// All projects data
const allProjectsData = [];

/***********************************************
 * Projects Data
 ***********************************************/
const bestProjects = [
    {
        title: "Car & Client Management System",
        desc: "Built a responsive dashboard for managing cars and clients using HTML5, CSS3, JavaScript, and REST APIs. Implemented full CRUD operations with dynamic data handling and authentication.",
        img: "https://iili.io/CFLANYg.md.png",
        live: "https://galalabdelbaset.github.io/CarManager/",
        code: "https://github.com/GalalAbdElBaset/CarManager",
        tags: "HTML5 · CSS3 · JavaScript · REST APIs · CRUD",
        category: "javascript",
        stats: { lines: 1200, duration: "2 weeks", stars: 4 }
    },
    {
        title: "Student Activities Management System",
        desc: "Built a student activities management system with authentication and role-based access. Implemented CRUD operations and structured data handling.",
        img: "https://iili.io/Ksi74St.md.png",
        live: "https://galalabdelbaset.github.io/gradife-main/",
        code: "https://github.com/GalalAbdElBaset/gradife-main.git",
        tags: "HTML5 · CSS3 · JavaScript · Authentication · CRUD",
        category: "javascript",
        stats: { lines: 1500, duration: "3 weeks", stars: 5 }
    },
    {
        title: "Modern Web Design Template",
        desc: "Built a responsive landing page with interactive features like a scroll-to-top button, live timer, form validation, and smooth animations using HTML5, CSS3, and JavaScript.",
        img: "https://iili.io/Ksigle9.md.png",
        live: "https://galalabdelbaset.github.io/ModernWebTemplate/",
        code: "https://github.com/GalalAbdElBaset/ModernWebTemplate",
        tags: "HTML5 · CSS3 · JavaScript · Interactive",
        category: "javascript",
        stats: { lines: 800, duration: "1 week", stars: 3 }
    },
    {
        title: "Grill Master Restaurant",
        desc: "A responsive restaurant website featuring food menus, reservations, customer testimonials, and interactive UI components.",
        img: "https://iili.io/CFL2n5X.md.png",
        live: "https://galalabdelbaset.github.io/grillMaster/",
        code: "https://github.com/GalalAbdElBaset/grillMaster",
        tags: "HTML5 · CSS3 · JavaScript · Responsive",
        category: "javascript",
        stats: { lines: 950, duration: "1.5 weeks", stars: 3 }
    },
    {
        title: "Coffee Shop Website",
        desc: "Developed a responsive coffee shop website with modern UI, interactive menu, and optimized performance for faster loading.",
        img: "https://iili.io/CFs3hzJ.md.png",
        live: "https://galalabdelbaset.github.io/coffee-web/index.html",
        code: "https://github.com/GalalAbdElBaset/CoffeeWebsitPage",
        tags: "HTML5 · CSS3 · JavaScript · Performance",
        category: "javascript",
        stats: { lines: 550, duration: "5 days", stars: 2 }
    },
    {
        title: "E-Commerce Clothes",
        desc: "A modern responsive e-commerce clothing website featuring product listings, categories, shopping cart functionality, and local storage persistence.",
        img: "https://iili.io/CFswLdb.md.png",
        live: "https://galalabdelbaset.github.io/ecommerce-clothes/",
        code: "https://github.com/GalalAbdElBaset/ecommerce-clothes",
        tags: "HTML5 · CSS3 · JavaScript · E-Commerce",
        category: "html-css",
        stats: { lines: 1250, duration: "2 weeks", stars: 3 }
    }
];

const moreProjects = [
    {
        title: "Architectural CMA",
        desc: "A modern responsive architecture company website showcasing projects, services, and company profile with elegant design.",
        img: "https://iili.io/CFLa471.md.png",
        live: "https://galalabdelbaset.github.io/architectural--CMA-main/",
        code: "https://github.com/GalalAbdElBaset/architectural--CMA-main",
        tags: "HTML5 · CSS3 · JavaScript",
        category: "html-css",
        stats: { lines: 850, duration: "1 week", stars: 4 }
    },
    {
        title: "Foodie Master",
        desc: "A modern responsive food and restaurant website with menu sections, special offers, and engaging user experience.",
        img: "https://iili.io/CFLn3lf.md.png",
        live: "https://galalabdelbaset.github.io/foodie-master/#top",
        code: "https://github.com/GalalAbdElBaset/foodie-master",
        tags: "HTML5 · CSS3 · JavaScript",
        category: "html-css",
        stats: { lines: 890, duration: "1.5 weeks", stars: 3 }
    },
    {
        title: "Delivery Driver",
        desc: "A responsive delivery service website for drivers and logistics companies with service information and contact sections.",
        img: "https://iili.io/CFLE1lR.md.png",
        live: "https://galalabdelbaset.github.io/Delivery-driver/",
        code: "https://github.com/GalalAbdElBaset/Delivery-driver",
        tags: "HTML5 · CSS3 · JavaScript",
        category: "html-css",
        stats: { lines: 720, duration: "1 week", stars: 2 }
    },
    {
        title: "Design Place",
        desc: "A responsive interior design website featuring project showcases, company services, and modern user experience.",
        img: "https://iili.io/CFLhaVt.md.png",
        live: "https://galalabdelbaset.github.io/Design-plase-main/",
        code: "https://github.com/GalalAbdElBaset/Design-plase-main",
        tags: "HTML5 · CSS3 · JavaScript",
        category: "html-css",
        stats: { lines: 700, duration: "1 week", stars: 2 }
    }
];

allProjectsData.push(...bestProjects, ...moreProjects);

function getFilteredProjects() {
    return allProjectsData.filter(project => {
        const matchesFilter = currentFilter === 'all' || project.category === currentFilter;
        const matchesSearch = currentSearch === '' || 
            project.title.toLowerCase().includes(currentSearch) || 
            project.desc.toLowerCase().includes(currentSearch);
        return matchesFilter && matchesSearch;
    });
}

// Remove preloader and init
window.addEventListener('load', () => {
    console.log('🚀 Page loaded');
    
    setTimeout(() => {
        const pre = document.getElementById('preloader');
        if (pre) pre.style.opacity = '0';
        setTimeout(() => pre && pre.remove(), 600);
    }, 700);
    
    initMobileMenu();
    initFilterButtons();
    initSearchInput();
    initViewMoreButton();
    
    visibleProjectsCount = 6;
    loadProjects();
    
    initCounters();
    initAvailabilityStatus();
    initSkillBars();
    initAccentButtons();
});

window.addEventListener('beforeunload', () => {
    if (typingTimeout) clearTimeout(typingTimeout);
});

/***********************************************
 * Accent Buttons (Dynamic Color Change)
 ***********************************************/
function applyAccentColor(accentColor) {
    // تغيير الـ CSS Variable الرئيسية
    document.documentElement.style.setProperty('--accent', accentColor);
    
    // تغيير اللون الثانوي بناءً على اللون الأساسي
    let accent2 = '#8b5cf6'; // Default purple
    if (accentColor === '#ef4444') {
        accent2 = '#f97316';
    } else if (accentColor === '#10b981') {
        accent2 = '#06b6d4';
    } else {
        accent2 = '#8b5cf6';
    }
    document.documentElement.style.setProperty('--accent-2', accent2);
    
    // حفظ اللون في localStorage
    localStorage.setItem('site-accent', accentColor);
}

function initAccentButtons() {
    // عند تحميل الصفحة، طبق اللون المحفوظ
    const savedAccent = localStorage.getItem('site-accent');
    if (savedAccent) {
        applyAccentColor(savedAccent);
    }
    
    // الأزرار بتاعت تغيير اللون (Palette)
    document.querySelectorAll('.palette').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const newColor = btn.dataset.color;
            applyAccentColor(newColor);
            
            // عرض رسالة للمستخدم إن اللون اتغير
            Swal.fire({
                title: 'Accent Changed!',
                text: `Theme color updated successfully`,
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                toast: true,
                position: 'bottom-end'
            });
        });
    });
}

/***********************************************
 * Mobile Menu
 ***********************************************/
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const closeBtn = document.getElementById('closeMobileMenu');
    const overlay = document.getElementById('mobileOverlay');
    const navLinks = document.querySelectorAll('.mobile-nav-links a');
    
    function openMenu() {
        mobileNav.classList.add('open');
        overlay.classList.add('open');
        document.body.classList.add('menu-open');
        menuBtn.setAttribute('aria-expanded', 'true');
        mobileNav.setAttribute('aria-hidden', 'false');
        setTimeout(() => navLinks[0]?.focus(), 100);
    }
    
    function closeMenu() {
        mobileNav.classList.remove('open');
        overlay.classList.remove('open');
        document.body.classList.remove('menu-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
    }
    
    if (menuBtn) {
        menuBtn.addEventListener('click', openMenu);
        menuBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') openMenu();
        });
    }
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
            closeMenu();
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                closeMenu();
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    target.focus();
                }, 300);
            }
        });
    });
}

/***********************************************
 * Animated Counters
 ***********************************************/
function initCounters() {
    const counters = [
        { element: 'statProjects', target: allProjectsData.length },
        { element: 'statYears', target: 2 },
        { element: 'statCommits', target: 500 },
        { element: 'statTech', target: 10 }
    ];
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const counter = counters.find(c => c.element === id);
                if (counter) {
                    animateCounter(entry.target, counter.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(c => {
        const el = document.getElementById(c.element);
        if (el) observer.observe(el);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 50);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = current;
        }
    }, 30);
}

function initAvailabilityStatus() {
    const badge = document.getElementById('availabilityBadge');
    if (badge) {
        const statusDot = badge.querySelector('.status-dot');
        if (statusDot) {
            statusDot.style.background = '#10b981';
            statusDot.style.boxShadow = '0 0 8px #10b981';
        }
    }
}

function initSkillBars() {
    const skillSection = document.getElementById('skills');
    if (!skillSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = document.querySelectorAll('.progress-fill');
                fills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0';
                    setTimeout(() => { fill.style.width = width; }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    observer.observe(skillSection);
}

/***********************************************
 * Typing effect
 ***********************************************/
(function typing() {
    const el = document.getElementById('typingLine');
    if (!el) return;
    const texts = [
        "Hi, I'm Galal Abd El-Baset — Front-End Developer 💻",
        "HTML · CSS · JavaScript · REST APIs",
        "Building responsive, high-performance web apps"
    ];
    let idx = 0, char = 0, forward = true;
    
    function step() {
        if (!el) return;
        const t = texts[idx];
        el.textContent = t.slice(0, char);
        if (forward) {
            char++;
            if (char > t.length) {
                forward = false;
                typingTimeout = setTimeout(step, 1200);
                return;
            }
        } else {
            char--;
            if (char === 0) {
                forward = true;
                idx = (idx + 1) % texts.length;
            }
        }
        typingTimeout = setTimeout(step, forward ? 60 : 24);
    }
    step();
})();

/***********************************************
 * Theme toggle
 ***********************************************/
const themeFloat = document.getElementById('themeFloat');
const themeIcon = document.getElementById('themeIcon');
const bodyEl = document.body;
const saved = localStorage.getItem('site-theme');
const savedAccent = localStorage.getItem('site-accent');

if (saved === 'light') {
    bodyEl.classList.add('light');
    themeIcon.className = 'fa-solid fa-sun';
    themeFloat.setAttribute('aria-pressed', 'true');
}
if (savedAccent) {
    document.documentElement.style.setProperty('--accent', savedAccent);
    if (savedAccent === '#ef4444') document.documentElement.style.setProperty('--accent-2', '#f97316');
    else if (savedAccent === '#10b981') document.documentElement.style.setProperty('--accent-2', '#06b6d4');
    else document.documentElement.style.setProperty('--accent-2', '#8b5cf6');
}
updateThemeFloat();

themeFloat.addEventListener('click', () => {
    bodyEl.classList.toggle('light');
    localStorage.setItem('site-theme', bodyEl.classList.contains('light') ? 'light' : 'dark');
    updateThemeFloat();
});

function updateThemeFloat() {
    const isLight = bodyEl.classList.contains('light');
    themeIcon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    themeFloat.setAttribute('aria-pressed', isLight ? 'true' : 'false');
}

/***********************************************
 * Header scroll & back-to-top
 ***********************************************/
const header = document.getElementById('siteHeader');
const backToTop = document.getElementById('backToTop');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const y = window.scrollY;
            if (y > 20) {
                header.style.backdropFilter = 'blur(6px)';
                header.style.background = 'rgba(2,6,23,0.55)';
                header.style.boxShadow = '0 8px 30px rgba(2,6,23,0.35)';
            } else {
                header.style.backdropFilter = 'none';
                header.style.background = 'transparent';
                header.style.boxShadow = 'none';
            }
            backToTop.style.display = (y > 600) ? 'flex' : 'none';
            ticking = false;
        });
        ticking = true;
    }
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/***********************************************
 * Avatar parallax (optimized)
 ***********************************************/
const avatar = document.getElementById('avatar');
if (avatar && window.innerWidth > 768) {
    let rafId = null;
    avatar.addEventListener('mousemove', (e) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            const r = avatar.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dx = (e.clientX - cx) / r.width;
            const dy = (e.clientY - cy) / r.height;
            avatar.style.transform = `translate3d(${dx * 8}px, ${dy * 8}px, 0) rotateX(${dy * 6}deg) rotateY(${dx * 6}deg)`;
            const img = avatar.querySelector('img');
            if (img) img.style.transform = `scale(1.07) translate3d(${dx * 6}px, ${dy * 6}px, 0)`;
        });
    });
    avatar.addEventListener('mouseleave', () => {
        avatar.style.transform = '';
        const img = avatar.querySelector('img');
        if (img) img.style.transform = '';
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function createProjectCard(project) {
    return `
        <div class="project card">
            <img src="${project.img}" alt="${project.title}" loading="lazy" />
            <h4>${escapeHtml(project.title)}</h4>
            <div class="tags muted">${escapeHtml(project.tags)}</div>
            <p class="muted">${escapeHtml(project.desc.substring(0, 80))}...</p>
            <div style="display:flex;gap:8px;margin-top:10px">
                <a href="${project.live}" target="_blank" class="cta" style="padding:6px 10px;font-size:13px;" data-project-link><i class="fa-solid fa-arrow-up-right-from-square"></i> Live</a>
                <a href="${project.code}" target="_blank" class="cta" style="padding:6px 10px;font-size:13px;" data-project-link><i class="fa-solid fa-code"></i> Code</a>
            </div>
        </div>
    `;
}

function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    if (!grid) return;
    
    const filtered = getFilteredProjects();
    const totalFiltered = filtered.length;
    const projectsToShow = filtered.slice(0, visibleProjectsCount);
    const hasMore = visibleProjectsCount < totalFiltered;
    
    if (projectsToShow.length === 0) {
        grid.innerHTML = `<div class="no-results"><i class="fa-solid fa-folder-open"></i><p>No projects found.</p></div>`;
        if (viewMoreBtn) viewMoreBtn.classList.add('hidden');
        return;
    }
    
    grid.innerHTML = projectsToShow.map(p => createProjectCard(p)).join('');
    attachProjectEvents();
    
    if (viewMoreBtn) {
        if (hasMore) {
            viewMoreBtn.classList.remove('hidden');
            viewMoreBtn.innerHTML = `<i class="fa-solid fa-eye"></i> Load More (${visibleProjectsCount}/${totalFiltered})`;
        } else {
            viewMoreBtn.classList.add('hidden');
        }
    }
}

function attachProjectEvents() {
    document.querySelectorAll('.project').forEach(project => {
        project.removeEventListener('click', projectClickHandler);
        project.addEventListener('click', projectClickHandler);
    });
}

function projectClickHandler(e) {
    if (e.target.closest('[data-project-link]')) return;
    const title = this.querySelector('h4')?.textContent;
    const project = allProjectsData.find(p => p.title === title);
    if (project) openProjectModal(project);
}

function initFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            visibleProjectsCount = 6;
            loadProjects();
        });
    });
}

function initSearchInput() {
    const searchInput = document.getElementById('projectSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.trim().toLowerCase();
            visibleProjectsCount = 6;
            loadProjects();
        });
    }
}

function initViewMoreButton() {
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', () => {
            visibleProjectsCount += 3;
            loadProjects();
        });
    }
}

/***********************************************
 * Project Modal
 ***********************************************/
function openProjectModal(project) {
    const modal = document.getElementById('projectModal');
    const content = document.getElementById('modalContent');
    if (!modal || !content) return;
    
    content.innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 320px;gap:18px">
            <div>
                <img src="${project.img}" alt="${project.title}" style="width:100%;height:240px;object-fit:cover;border-radius:10px;margin-bottom:10px">
                <h3>${escapeHtml(project.title)}</h3>
                <p class="muted">${escapeHtml(project.desc)}</p>
                <div style="margin-top:15px">
                    <h4>Statistics</h4>
                    <div style="display:flex;gap:20px;margin-top:10px;flex-wrap:wrap">
                        <div><strong>📝 Lines:</strong> ${project.stats?.lines || 'N/A'}</div>
                        <div><strong>⏱️ Duration:</strong> ${project.stats?.duration || 'N/A'}</div>
                        <div><strong>⭐ Stars:</strong> ${project.stats?.stars || 0}</div>
                    </div>
                </div>
                <div style="height:10px"></div>
                <a href="${project.live}" target="_blank" class="cta" style="padding:8px 16px;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live</a>
                <a href="${project.code}" target="_blank" class="cta" style="padding:8px 16px;margin-left:8px"><i class="fa-solid fa-code"></i> Code</a>
            </div>
            <div><h4>Details</h4><p class="muted">${escapeHtml(project.tags)}</p><p class="muted">Role: Front-end Developer</p></div>
        </div>
    `;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
        modal.style.opacity = '1';
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) closeBtn.focus();
    }, 20);
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.style.opacity = '0';
    modal.setAttribute('aria-hidden', 'true');
    setTimeout(() => modal.style.display = 'none', 220);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
});

document.getElementById('projectModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') closeProjectModal();
});

/***********************************************
 * Cursor trail (disabled on mobile for performance)
 ***********************************************/
const cursorDot = document.getElementById('cursorDot');
if (cursorDot && window.innerWidth > 768) {
    let rafId = null;
    window.addEventListener('mousemove', (e) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            cursorDot.style.left = (e.clientX - 8) + 'px';
            cursorDot.style.top = (e.clientY - 8) + 'px';
            cursorDot.style.width = '16px';
            cursorDot.style.height = '16px';
            cursorDot.style.borderRadius = '50%';
            cursorDot.style.background = 'linear-gradient(90deg,var(--accent),var(--accent-2))';
        });
    });
    window.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'scale(0.2)';
        cursorDot.style.opacity = '0.6';
    });
} else if (cursorDot) {
    cursorDot.style.display = 'none';
}

/***********************************************
 * Formspree Contact
 ***********************************************/
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const sendBtn = document.getElementById('sendBtn');
        const sendSpinner = document.getElementById('sendSpinner');
        const sendText = sendBtn?.querySelector('.sendText');
        if (!sendBtn || !sendSpinner || !sendText) return;
        
        const emailInput = document.getElementById('email');
        const replyToField = document.getElementById('formReplyTo');
        if (replyToField && emailInput) replyToField.value = emailInput.value;
        
        sendBtn.disabled = true;
        sendText.textContent = 'Sending...';
        sendSpinner.style.display = 'inline-block';
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                Swal.fire({ title: 'Thank you! 🎉', text: 'Your message has been sent!', icon: 'success' });
                form.reset();
            } else throw new Error();
        } catch (error) {
            Swal.fire({ title: 'Oops...', text: 'Something went wrong. Please email me directly.', icon: 'error' });
        } finally {
            sendBtn.disabled = false;
            sendText.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send';
            sendSpinner.style.display = 'none';
        }
    });
}

/***********************************************
 * CV Download
 ***********************************************/
document.getElementById('downloadCV')?.addEventListener('click', () => {
    Swal.fire({ title: 'Resume Download', text: 'Opening in new tab...', icon: 'info', timer: 2000, showConfirmButton: false });
});
document.querySelector('.preview-cv')?.addEventListener('click', (e) => {
    e.preventDefault();
    Swal.fire({ title: 'Resume Preview', html: '<i class="fa-solid fa-file-pdf" style="font-size:4rem;color:#ef4444"></i><p>Click download to view PDF.</p>' });
});

/***********************************************
 * Smooth scroll
 ***********************************************/
document.querySelectorAll('nav a[href^="#"], footer a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});