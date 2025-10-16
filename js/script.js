// ===== UTILITY FUNCTIONS =====
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const detailButtons = document.querySelectorAll('.btn-details');

// ===== NAVIGATION FUNCTIONALITY =====
class Navigation {
    constructor() {
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setActiveSection();
    }

    bindEvents() {
        // Mobile menu toggle
        navToggle?.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu?.contains(e.target) && !navToggle?.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Scroll behavior
        window.addEventListener('scroll', throttle(() => {
            this.handleScroll();
            this.setActiveSection();
        }, 100));
        
        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        navMenu?.classList.toggle('active');
        navToggle?.classList.toggle('active');
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    }

    closeMenu() {
        this.isMenuOpen = false;
        navMenu?.classList.remove('active');
        navToggle?.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        
        // Navbar background
        if (scrolled > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }

    setActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            }
        });
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.animate-on-scroll');
        this.init();
    }

    init() {
        this.observeElements();
        this.animateSkillBars();
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        this.animatedElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.getAttribute('data-width');
                    setTimeout(() => {
                        skillBar.style.width = width;
                    }, 200);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }
}

// ===== PROJECT MODAL =====
class ProjectModal {
    constructor() {
        this.projectData = {
            SiteDeHoroscopo: {
                title: "Noctis - Site de Horóscopo",
                description: "Aplicação web completa para consulta de horóscopos com cálculos astrológicos precisos. Sistema full-stack com Next.js, API RESTful, autenticação JWT, testes automatizados e deploy containerizado.",
                image: "images/noctis-logo.png",
                technologies: ["Next.js", "Node.js", "MongoDB", "TailwindCSS", "JWT", "Docker", "Kubernetes", "Jest", "Mongoose", "Express"],
                features: [
                    "Cálculos astrológicos precisos com astronomy-engine",
                    "Interface responsiva com TailwindCSS",
                    "API RESTful robusta com Node.js e Express",
                    "Autenticação segura com JWT e bcrypt",
                    "Banco de dados MongoDB com Mongoose",
                    "Testes automatizados com Jest e Supertest",
                    "Deploy containerizado com Docker e Kubernetes",
                    "Validação de dados com Zod",
                    "Cobertura de testes completa",
                    "Qualidade de código com ESLint"
                ],
                challenges: "O principal desafio foi implementar cálculos astrológicos precisos e em tempo real, integrando bibliotecas especializadas como astronomy-engine e astrochart, além de garantir performance otimizada para múltiplos usuários simultâneos.",
                results: "Sistema completo entregue com cobertura de testes de 95%, performance otimizada e arquitetura escalável pronta para produção com containerização Docker e orquestração Kubernetes.",
                liveUrl: "#",
                githubUrl: "https://github.com/CaioOSAlencar/Site-horoscopo-FRONT",
                githubApiUrl: "https://github.com/CaioOSAlencar/Site-horoscopo-API"
            },
            2: {
                title: "Dashboard Analytics",
                description: "Dashboard interativo para análise de dados empresariais com gráficos dinâmicos e relatórios em tempo real.",
                image: "images/project2-detail.jpg",
                technologies: ["Vue.js", "Laravel", "MySQL", "Chart.js", "Redis", "Docker"],
                features: [
                    "Gráficos interativos em tempo real",
                    "Sistema de filtros avançados",
                    "Exportação de relatórios em PDF",
                    "Notificações automáticas",
                    "Interface responsiva",
                    "Cache inteligente"
                ],
                challenges: "Otimizar a performance para lidar com grandes volumes de dados sem comprometer a experiência do usuário.",
                results: "Redução de 70% no tempo de geração de relatórios e aumento de 50% na produtividade da equipe.",
                liveUrl: "https://exemplo-dashboard.com",
                githubUrl: "https://github.com/usuario/dashboard"
            },
            3: {
                title: "App de Gestão de Tarefas",
                description: "Aplicação para gestão de projetos e tarefas com funcionalidades colaborativas e integração com calendário.",
                image: "images/project3-detail.jpg",
                technologies: ["Angular", "Express", "PostgreSQL", "TypeScript", "WebRTC", "PWA"],
                features: [
                    "Gerenciamento de projetos e tarefas",
                    "Colaboração em tempo real",
                    "Integração com calendário",
                    "Notificações push",
                    "Modo offline (PWA)",
                    "Sistema de comentários"
                ],
                challenges: "Implementar colaboração em tempo real com sincronização eficiente entre múltiplos usuários.",
                results: "Melhoria de 85% na organização de equipes e 45% de aumento na conclusão de projetos no prazo.",
                liveUrl: "https://exemplo-tasks.com",
                githubUrl: "https://github.com/usuario/task-manager"
            }
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Open modal
        detailButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const projectId = button.getAttribute('data-project');
                this.openModal(projectId);
            });
        });

        // Close modal
        modalClose?.addEventListener('click', () => this.closeModal());
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal?.style.display === 'block') {
                this.closeModal();
            }
        });
    }

    openModal(projectId) {
        const project = this.projectData[projectId];
        if (!project) return;

        const modalBody = document.getElementById('modal-body');
        
        modalBody.innerHTML = `
            <div class="project-detail">
                <div class="project-detail-header">
                    <img src="${project.image}" alt="${project.title}" class="project-detail-image">
                    <div class="project-detail-info">
                        <h2 class="project-detail-title">${project.title}</h2>
                        <p class="project-detail-description">${project.description}</p>
                        <div class="project-detail-links">
                            ${project.liveUrl !== "#" ? `
                                <a href="${project.liveUrl}" target="_blank" class="btn btn-primary">
                                    <i class="fas fa-external-link-alt"></i>
                                    Ver Site
                                </a>
                            ` : ''}
                            <a href="${project.githubUrl}" target="_blank" class="btn btn-secondary">
                                <i class="fab fa-github"></i>
                                Frontend
                            </a>
                            ${project.githubApiUrl ? `
                                <a href="${project.githubApiUrl}" target="_blank" class="btn btn-secondary">
                                    <i class="fas fa-server"></i>
                                    API
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
                
                <div class="project-detail-content">
                    <div class="detail-section">
                        <h3>Tecnologias Utilizadas</h3>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Principais Funcionalidades</h3>
                        <ul class="features-list">
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Desafios Técnicos</h3>
                        <p>${project.challenges}</p>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Resultados Alcançados</h3>
                        <p>${project.results}</p>
                    </div>
                </div>
            </div>
        `;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// ===== CONTACT FORM =====
class ContactForm {
    constructor() {
        this.form = contactForm;
        this.init();
    }

    init() {
        if (this.form) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Add loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.innerHTML = '<span class="spinner"></span> Enviando...';
        submitButton.disabled = true;
        
        try {
            // Simulate form submission (replace with actual API call)
            await this.simulateSubmission(data);
            
            // Success feedback
            this.showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            this.form.reset();
            
        } catch (error) {
            // Error feedback
            this.showNotification('Erro ao enviar mensagem. Tente novamente ou entre em contato por email.', 'error');
            console.error('Form submission error:', error);
        } finally {
            // Restore button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    async simulateSubmission(data) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) { // 90% success rate for demo
                    resolve(data);
                } else {
                    reject(new Error('Simulation error'));
                }
            }, 1500);
        });
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 20px',
            borderRadius: '8px',
            color: 'white',
            backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            zIndex: '1001',
            maxWidth: '400px',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => this.removeNotification(notification));
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);
    }

    removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// ===== SMOOTH SCROLLING FOR ALL INTERNAL LINKS =====
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Handle all anchor links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
}

// ===== LAZY LOADING FOR IMAGES =====
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observeImages();
        } else {
            this.loadAllImages();
        }
    }

    observeImages() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        this.images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }

    loadAllImages() {
        this.images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// ===== THEME TOGGLE (BONUS FEATURE) =====
class ThemeToggle {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.createToggleButton();
    }

    createToggleButton() {
        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
        toggleButton.className = 'theme-toggle';
        toggleButton.setAttribute('aria-label', 'Toggle dark mode');
        
        // Styles for the toggle button
        Object.assign(toggleButton.style, {
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-medium)',
            zIndex: '100',
            transition: 'all 0.3s ease'
        });
        
        toggleButton.addEventListener('click', () => this.toggleTheme());
        document.body.appendChild(toggleButton);
        
        this.toggleButton = toggleButton;
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('theme', this.theme);
    }

    applyTheme() {
        if (this.theme === 'dark') {
            document.documentElement.style.setProperty('--bg-primary', '#1e293b');
            document.documentElement.style.setProperty('--bg-secondary', '#334155');
            document.documentElement.style.setProperty('--text-primary', '#f8fafc');
            document.documentElement.style.setProperty('--text-secondary', '#cbd5e1');
            
            if (this.toggleButton) {
                this.toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
            }
        } else {
            document.documentElement.style.setProperty('--bg-primary', '#ffffff');
            document.documentElement.style.setProperty('--bg-secondary', '#f8fafc');
            document.documentElement.style.setProperty('--text-primary', '#1e293b');
            document.documentElement.style.setProperty('--text-secondary', '#64748b');
            
            if (this.toggleButton) {
                this.toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
    }
}

// ===== PERFORMANCE MONITORING =====
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`Page loaded in ${loadTime}ms`);
                
                // You can send this data to analytics
                // analytics.track('page_load_time', { duration: loadTime });
            }
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    const navigation = new Navigation();
    const scrollAnimations = new ScrollAnimations();
    const projectModal = new ProjectModal();
    const contactForm = new ContactForm();
    const smoothScroll = new SmoothScroll();
    const lazyLoader = new LazyLoader();
    const themeToggle = new ThemeToggle();
    const performanceMonitor = new PerformanceMonitor();
    
    // Add initial animations
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('fade-in');
    }
    
    // Console message for developers
    console.log('%c👋 Olá, desenvolvedor! Gostou do código? Vamos conversar!', 
        'color: #3b82f6; font-size: 16px; font-weight: bold;');
});

// ===== UTILITY FUNCTIONS FOR EXTERNAL USE =====
window.portfolioUtils = {
    scrollToSection: (sectionId) => {
        const section = document.querySelector(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    },
    
    openProject: (projectId) => {
        const modal = new ProjectModal();
        modal.openModal(projectId);
    },
    
    downloadCV: () => {
        // Track CV download
        if (typeof gtag !== 'undefined') {
            gtag('event', 'download', {
                'event_category': 'CV',
                'event_label': 'PDF Download'
            });
        }
        
        // Open CV in new tab
        window.open('assets/cv.pdf', '_blank');
    }
};

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator && 'production' === 'production') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}