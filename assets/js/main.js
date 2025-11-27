// ==========================================
// MODERN PORTFOLIO - MAIN JAVASCRIPT
// ==========================================

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupLazyLoading();
    }

    // Theme Management
    setupTheme() {
        const themeToggle = document.querySelector('.theme-toggle');
        const currentTheme = localStorage.getItem('theme') || 'light';
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const theme = document.documentElement.getAttribute('data-theme');
                const newTheme = theme === 'light' ? 'dark' : 'light';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Animate transition
                document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
            });
        }
    }

    // Navigation
    setupNavigation() {
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Mobile menu toggle
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
        
        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        // Active link on scroll
        this.setActiveNavOnScroll();

        // Navbar scroll effect
        let lastScroll = 0;
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.padding = '0.5rem 0';
            } else {
                navbar.style.padding = '1rem 0';
            }
            
            lastScroll = currentScroll;
        });
    }

    setActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Scroll Effects
    setupScrollEffects() {
        // Reveal elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(el => {
                const speed = el.dataset.speed || 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Scroll to top button
        const scrollTopBtn = document.querySelector('.scroll-to-top');
        
        if (scrollTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            });

            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Animations
    setupAnimations() {
        // Counter animation
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            });

            observer.observe(counter);
        });

        // Typing effect
        const typeElements = document.querySelectorAll('.typing-effect');
        
        typeElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            let i = 0;

            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    const typing = setInterval(() => {
                        if (i < text.length) {
                            element.textContent += text.charAt(i);
                            i++;
                        } else {
                            clearInterval(typing);
                        }
                    }, 100);
                    observer.unobserve(element);
                }
            });

            observer.observe(element);
        });
    }

    // Lazy Loading Images
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Form Validation
class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validate()) {
                this.submit();
            }
        });

        // Real-time validation
        this.form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
        });
    }

    validate() {
        let isValid = true;
        const fields = this.form.querySelectorAll('[required]');
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        // Required check
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email';
            }
        }

        // Min length
        if (field.hasAttribute('minlength')) {
            const minLength = parseInt(field.getAttribute('minlength'));
            if (value.length < minLength) {
                isValid = false;
                message = `Minimum ${minLength} characters required`;
            }
        }

        this.showValidation(field, isValid, message);
        return isValid;
    }

    showValidation(field, isValid, message) {
        const errorElement = field.nextElementSibling;
        
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('success');
            if (errorElement && errorElement.classList.contains('error-message')) {
                errorElement.textContent = '';
            }
        } else {
            field.classList.remove('success');
            field.classList.add('error');
            if (errorElement && errorElement.classList.contains('error-message')) {
                errorElement.textContent = message;
            }
        }
    }

    submit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        
        // Show success message
        this.showMessage('success', 'Message sent successfully!');
        this.form.reset();
    }

    showMessage(type, message) {
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        
        this.form.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
}

// Project Filter
class ProjectFilter {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (this.container) {
            this.init();
        }
    }

    init() {
        const filters = document.querySelectorAll('.filter-btn');
        const projects = document.querySelectorAll('.project-item');
        
        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                const category = filter.dataset.filter;
                
                // Update active button
                filters.forEach(btn => btn.classList.remove('active'));
                filter.classList.add('active');
                
                // Filter projects
                projects.forEach(project => {
                    if (category === 'all' || project.dataset.category === category) {
                        project.style.display = 'block';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        project.style.opacity = '0';
                        project.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            project.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
    new FormValidator('#contact-form');
    new ProjectFilter('.projects-grid');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
