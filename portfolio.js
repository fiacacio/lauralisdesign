// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close');
    const portfolioItems = document.querySelectorAll('.portfolio-item[data-project]');
    
    // Dados dos projetos
    const projects = {
        dentista_bruna: {
            title: 'Consultório Odontológico',
            description: 'Projeto completo de design de interiores para consultório odontológico, criando um ambiente acolhedor e profissional.',
            images: [
                'portifolio/dentista_bruna/Cores que inspiram e acolhem! Esse consultório odontológico ganhou vida com uma combinação única (1).jpg',
                'portifolio/dentista_bruna/Cores que inspiram e acolhem! Esse consultório odontológico ganhou vida com uma combinação única (2).jpg',
                'portifolio/dentista_bruna/Cores que inspiram e acolhem! Esse consultório odontológico ganhou vida com uma combinação única (3).jpg',
                'portifolio/dentista_bruna/Cores que inspiram e acolhem! Esse consultório odontológico ganhou vida com uma combinação única (4).jpg'
            ]
        },
        residencia_hossri: {
            title: 'Suíte Master',
            description: 'Projeto residencial de suíte master com design acolhedor e aconchegante, expressando a personalidade única do cliente.',
            images: [
                'portifolio/residencia_hossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de (1).jpg',
                'portifolio/residencia_hossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de (2).jpg',
                'portifolio/residencia_hossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de (3).jpg',
                'portifolio/residencia_hossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de (4).jpg',
                'portifolio/residencia_hossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de (5).jpg',
                'portifolio/residencia_hossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de (6).jpg',
                'portifolio/residencia_hossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de (7).jpg',
                'portifolio/residencia_hossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de (8).jpg',
                'portifolio/residencia_hossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de (9).jpg',
                'portifolio/residencia_hossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de.jpg'
            ]
        }
    };

    // Abrir modal
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projects[projectId];
            
            if (project) {
                openModal(project);
            }
        });
    });

    // Fechar modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    function openModal(project) {
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;
        document.getElementById('mainImage').src = project.images[0];
        document.getElementById('mainImage').alt = project.title;

        // Criar thumbnails
        const thumbnailsContainer = document.getElementById('thumbnails');
        thumbnailsContainer.innerHTML = '';

        project.images.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image;
            thumbnail.alt = `${project.title} - Imagem ${index + 1}`;
            thumbnail.classList.add('thumbnail');
            if (index === 0) thumbnail.classList.add('active');

            thumbnail.addEventListener('click', function() {
                // Remover classe active de todos os thumbnails
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                // Adicionar classe active ao thumbnail clicado
                this.classList.add('active');
                // Trocar imagem principal
                document.getElementById('mainImage').src = this.src;
            });

            thumbnailsContainer.appendChild(thumbnail);
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Navegação mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Header transparente no scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
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
    const animatedElements = document.querySelectorAll('.portfolio-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
