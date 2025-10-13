// Navegação mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Header transparente no scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = 'none';
    }

    // Aumentar a opacidade do gradiente do hero conforme o scroll
    const overlay = document.querySelector('.carousel-overlay');
    if (overlay) {
        const maxOpacity = 0.85; // opacidade máxima desejada
        const startAt = 0;       // inicia efeito no topo
        const endAt = 400;       // distância de scroll para atingir o máximo
        const scrolled = Math.min(Math.max(window.scrollY - startAt, 0), endAt);
        const progress = scrolled / endAt;
        const base = 0.35;       // opacidade inicial definida no CSS
        const current = base + (maxOpacity - base) * progress;
        overlay.style.opacity = String(current);
    }
});

// Animação de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos elementos
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .about-text, .contact-info');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Formulário de contato
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simular envio do formulário
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Mensagem Enviada!';
            submitBtn.style.background = '#4CAF50';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Carrossel de imagens do hero
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
let slideInterval;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function startCarousel() {
    if (slides.length > 1) {
        slideInterval = setInterval(nextSlide, 9000); // Muda a cada 9 segundos
    }
}

function stopCarousel() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// Iniciar carrossel quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    startCarousel();

    // Na home (index), tornar os cards do portfólio clicáveis para navegar
    // Só aplica se não houver modal (ou seja, não estamos na página de portfólio)
    if (!document.getElementById('projectModal')) {
        document.querySelectorAll('#portfolio .portfolio-item').forEach(item => {
            item.addEventListener('click', () => {
                window.location.href = 'portfolio.html';
            });
        });
    }
});

// Pausar carrossel quando o usuário está interagindo
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopCarousel();
    } else {
        startCarousel();
    }
});

// Efeito parallax suave nos círculos do hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroCircles = document.querySelectorAll('.hero-circle');
    
    heroCircles.forEach((circle, index) => {
        const speed = 0.5 + (index * 0.1);
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Lazy loading para imagens (se adicionadas futuramente)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
