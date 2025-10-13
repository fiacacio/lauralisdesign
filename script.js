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

    // Parallax suave no fade do herói e leve movimento do background
    const fade = document.querySelector('.hero-fade');
    const carousel = document.querySelector('.hero-carousel');
    const portfolioFade = document.querySelector('.portfolio-fade');
    if (fade) {
        const y = Math.min(window.scrollY, 250);
        fade.style.transform = `translateY(${y * 0.2}px)`;
        fade.style.opacity = String(1 - Math.min(y / 250, 0.6));
    }
    if (carousel) {
        const y2 = Math.min(window.scrollY, 300);
        carousel.style.transform = `translateY(${y2 * 0.1}px)`; // parallax de fundo
    }

    // Fade invertido ao entrar no portfólio
    if (portfolioFade) {
        const portfolioSection = document.getElementById('portfolio');
        const rect = portfolioSection.getBoundingClientRect();
        // Quando o topo da seção aproxima-se do topo da viewport
        const visible = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / 200));
        portfolioFade.style.opacity = String(visible);
        portfolioFade.style.transform = `translateY(${(1 - visible) * 20}px)`;
    }

    // Parallax suave da bolinha rosa do Sobre
    const aboutCircle = document.querySelector('.about-circle');
    if (aboutCircle) {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const rectAbout = aboutSection.getBoundingClientRect();
            const offset = (window.innerHeight - rectAbout.top) * 0.06; // fator sutil
            aboutCircle.style.transform = `translateY(${offset}px)`;
        }
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

    // Contador dinâmico de projetos (na home)
    const projectsCountEl = document.getElementById('projectsCount');
    if (projectsCountEl) {
        // Conta itens reais no portfólio da home, ignorando placeholders
        const items = document.querySelectorAll('#portfolio .portfolio-item');
        let count = 0;
        items.forEach(el => {
            if (!el.classList.contains('coming-soon')) count++;
        });
        // Animação simples de contagem
        const duration = 800;
        const start = performance.now();
        const target = count;
        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const val = Math.floor(target * progress);
            projectsCountEl.textContent = String(val);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);

        // Clique no número leva ao portfólio
        projectsCountEl.style.cursor = 'pointer';
        projectsCountEl.addEventListener('click', () => {
            window.location.href = 'portfolio.html';
        });
    }

    // Rotaciona as polaroids automaticamente
    const polaroids = document.querySelectorAll('.polaroid-stack .polaroid');
    if (polaroids.length > 0) {
        let idx = 0;
        setInterval(() => {
            polaroids.forEach((p, i) => p.classList.toggle('active', i === idx));
            idx = (idx + 1) % polaroids.length;
        }, 4000);
    }

    // Carrossel de projetos na home (destaque com esmaecimento)
    const track = document.querySelector('.carousel-track');
    const items = track ? Array.from(track.querySelectorAll('.portfolio-item')) : [];
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let carouselIndex = 0; // índice do primeiro destacado

    function updateCarousel() {
        items.forEach((el, idx) => {
            el.classList.remove('highlight');
            el.classList.remove('dim');
            // central destacado: index+1
            if (idx === (carouselIndex + 1) % items.length) {
                el.classList.add('highlight');
            } else {
                el.classList.add('dim');
            }
        });
        // deslocamento: centraliza o item (index+1) | no mobile vira vertical (sem translateX)
        const itemWidth = items[0]?.getBoundingClientRect().width || 0;
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            track.style.transform = 'translateX(0)';
        } else {
            const gap = 32; // aproximado do CSS
            const offset = (itemWidth + gap) * carouselIndex;
            track.style.transform = `translateX(${-offset}px)`;
        }
    }

    if (track && items.length > 0) {
        updateCarousel();
        nextBtn?.addEventListener('click', () => {
            carouselIndex = (carouselIndex + 1) % items.length;
            updateCarousel();
        });
        prevBtn?.addEventListener('click', () => {
            carouselIndex = (carouselIndex - 1 + items.length) % items.length;
            updateCarousel();
        });
        // Auto-advance (mais lento)
        setInterval(() => {
            carouselIndex = (carouselIndex + 1) % items.length;
            updateCarousel();
        }, 11000);
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
        const speedY = 0.12 + index * 0.03; // mais suave
        const speedX = 0.02 + index * 0.01;
        circle.style.transform = `translate(${scrolled * speedX}px, ${scrolled * speedY}px)`;
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
