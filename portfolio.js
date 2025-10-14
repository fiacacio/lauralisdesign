// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close');
    const portfolioItems = document.querySelectorAll('.portfolio-item[data-project]');
    
    // Dados dos projetos
    const projects = {
        dentista_bruna: {
            title: 'Consultório Odontológico',
            description: 'Esse consultório odontológico ganhou vida com uma combinação única de verdes claros, escuros e amadeirado, criando um ambiente cheio de personalidade e conforto. A iluminação branca quente completou o clima aconchegante que todos merecem!',
            images: [
                'portifolio/dentista_bruna/Cores que inspiram e acolhem! Esse consultório odontológico ganhou vida com uma combinação única (1).jpg',
                'portifolio/dentista_bruna/Cores que inspiram e acolhem! Esse consultório odontológico ganhou vida com uma combinação única (2).jpg',
                'portifolio/dentista_bruna/Cores que inspiram e acolhem! Esse consultório odontológico ganhou vida com uma combinação única (3).jpg',
                'portifolio/dentista_bruna/Cores que inspiram e acolhem! Esse consultório odontológico ganhou vida com uma combinação única (4).jpg'
            ]
        },
        residencia_rossri: {
            title: 'Suíte Master',
            description: 'Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de seus moradores. Cada detalhe foi pensado, cada item desenhado para atender as necessidades, o funcional não foi deixado de lado, ele caminha lado a lado com a estética. As cores claras trazem paz e serenidade com um toque de cor através do rosé que de forma delicada trouxe vida e alegria.',
            images: [
                'portifolio/residencia_rossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de (1).jpg',
                'portifolio/residencia_rossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de (2).jpg',
                'portifolio/residencia_rossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de (3).jpg',
                'portifolio/residencia_rossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de (4).jpg',
                'portifolio/residencia_rossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de (5).jpg',
                'portifolio/residencia_rossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de (6).jpg',
                'portifolio/residencia_rossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de (7).jpg',
                'portifolio/residencia_rossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de (8).jpg',
                'portifolio/residencia_rossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de (9).jpg',
                'portifolio/residencia_rossri/Uma suíte master deslumbrante! Um quarto acolhedor, aconchegante que expressa a personalidade de.jpg'
            ]
        },
        br_lic: {
            title: 'BR LIC - Escritório Industrial',
            description: 'Aquele antes e depois que a gente adora né? Nesse projeto a empresa Ômega Net cedeu um pouco do seu espaço a BRLIC Tecnologia, duas empresas que já caminhavam juntas, e continuarão só que de cara nova. Gostaram?',
            images: [
                'portifolio/br_lic/Aquele antes e depois que a gente adora né Nesse projeto a empresa Ômega Net cedeu um pouco do s (3).jpg',
                'portifolio/br_lic/Aquele antes e depois que a gente adora né Nesse projeto a empresa Ômega Net cedeu um pouco do s (1).jpg',
                'portifolio/br_lic/Aquele antes e depois que a gente adora né Nesse projeto a empresa Ômega Net cedeu um pouco do s (2).jpg',
                'portifolio/br_lic/Aquele antes e depois que a gente adora né Nesse projeto a empresa Ômega Net cedeu um pouco do s.jpg',
                'portifolio/br_lic/Para esse Office de tecnologia, aquele modelo tradicional de escritório com salinhas separadas, .jpg',
                'portifolio/br_lic/Para esse Office de tecnologia, aquele modelo tradicional de escritório com salinhas separadas,  (2).jpg',
                'portifolio/br_lic/Para esse Office de tecnologia, aquele modelo tradicional de escritório com salinhas separadas,  (3).jpg'
            ]
        },
        saude_animal: {
            title: 'Clínica Veterinária',
            description: 'Antes e depois de revitalização de fachada alinhada à identidade visual, com soluções de custo eficiente e estética atualizada.',
            images: [
                'portifolio/saude_animal/ANTES e DEPOIS A importância de ter uma fachada bem alinhada com a identidade do seu negócio. A .jpg',
                'portifolio/saude_animal/ANTES e DEPOIS Nesse projeto o cliente queria dar uma vida nova para essa fachada mas sem abrir .jpg',
                'portifolio/saude_animal/ANTES e DEPOIS Nesse projeto o cliente queria dar uma vida nova para essa fachada mas sem abrir  (1).jpg'
            ]
        },
        killiney_dublin: {
            title: 'Killiney, Dublin — Remodelação de Cozinha',
            description: 'Projeto residencial em Killiney (Dublin) com remodelação de cozinha e moodboard. Antes e depois evidenciam ganho de funcionalidade e estética contemporânea.',
            images: [
                'portifolio/killiney_dublin/Antes e Depois - Before and After. Quem não ama ver um antes e depois ...Renderização- @montani3.jpg',
                'portifolio/killiney_dublin/Antes e Depois - Before and After. Quem não ama ver um antes e depois ...Renderização- @montani3 (1).jpg',
                'portifolio/killiney_dublin/Antes e Depois - Before and After...#architecture #remodeling #beforeandafter #kitchendesign #in.jpg',
                'portifolio/killiney_dublin/Antes e Depois - Before and After...#architecture #remodeling #beforeandafter #kitchendesign #in (1).jpg',
                'portifolio/killiney_dublin/Casa em Killiney - Killiney House Moodboard #designdeinteriores #moodboard #estudopreliminar #in.jpg'
            ]
        }
    };

    // Abrir modal (click e toque para mobile)
    portfolioItems.forEach(item => {
        const openFromItem = () => {
            const projectId = item.getAttribute('data-project');
            const project = projects[projectId];
            if (project) openModal(project);
        };

        item.addEventListener('click', openFromItem);
        item.addEventListener('touchend', function(e) {
            // evita duplo disparo em alguns navegadores
            e.preventDefault();
            openFromItem();
        }, { passive: false });
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
        const main = document.getElementById('mainImage');
        const first = project.images[0];
        const firstWebp = first.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        // srcset responsivo
        const makeSrcset = (base) => `${base.replace(/\.webp$/, '-480.webp')} 480w, ${base.replace(/\.webp$/, '-768.webp')} 768w, ${base.replace(/\.webp$/, '-1200.webp')} 1200w, ${base} 1600w`;
        main.src = firstWebp;
        main.srcset = makeSrcset(firstWebp);
        main.sizes = '(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1200px) 1200px, 1600px';
        main.onerror = function() { this.onerror = null; this.src = first; };
        main.alt = project.title;

        // Criar thumbnails
        const thumbnailsContainer = document.getElementById('thumbnails');
        thumbnailsContainer.innerHTML = '';

        project.images.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            // Preferir WebP se existir (mesmo nome trocando extensão)
            const webpCandidate = image.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            thumbnail.src = webpCandidate;
            thumbnail.onerror = function() { this.onerror = null; this.src = image; };
            thumbnail.alt = `${project.title} - Imagem ${index + 1}`;
            thumbnail.classList.add('thumbnail');
            if (index === 0) thumbnail.classList.add('active');

            thumbnail.addEventListener('click', function() {
                // Remover classe active de todos os thumbnails
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                // Adicionar classe active ao thumbnail clicado
                this.classList.add('active');
                // Trocar imagem principal
                const main = document.getElementById('mainImage');
                main.src = this.src;
                if (this.src.endsWith('.webp')) {
                    const base = this.src;
                    main.srcset = `${base.replace(/\.webp$/, '-480.webp')} 480w, ${base.replace(/\.webp$/, '-768.webp')} 768w, ${base.replace(/\.webp$/, '-1200.webp')} 1200w, ${base} 1600w`;
                    main.sizes = '(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1200px) 1200px, 1600px';
                } else {
                    main.removeAttribute('srcset');
                    main.removeAttribute('sizes');
                }
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

    // Unificar com a home: apenas sombra no scroll (sem alterar background)
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
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
