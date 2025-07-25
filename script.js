document.addEventListener('DOMContentLoaded', function() {

    // Observer para animações on-scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));

    // Comportamento do Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });


    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Carrossel de Depoimentos com SwiperJS
    const testimonialsSlider = new Swiper('.testimonials-slider', {
        loop: true,
        spaceBetween: 20,
        autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: { 
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });

    // Galeria Interativa Antes/Depois
    document.querySelectorAll('.before-after-slider').forEach(sliderContainer => {
        const handle = sliderContainer.querySelector('.slider-handle');
        const afterImage = sliderContainer.querySelector('.img-after');
        if (!handle || !afterImage) return;

        let isDragging = false;
        
        const onDrag = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            if(clientX === undefined) return;
            
            const containerRect = sliderContainer.getBoundingClientRect();
            let positionX = clientX - containerRect.left;
            const percentage = Math.max(0, Math.min(positionX / containerRect.width, 1)) * 100;
            
            handle.style.left = `${percentage}%`;
            afterImage.style.width = `${percentage}%`;
        };
        
        const startDrag = (e) => { 
            isDragging = true;
             // Adiciona a prevenção de evento aqui também se necessário no mobile
            if (e.type === 'touchstart') e.preventDefault();
        };
        const stopDrag = () => { isDragging = false; };

        sliderContainer.addEventListener('mousedown', startDrag);
        sliderContainer.addEventListener('touchstart', startDrag, { passive: false });
        window.addEventListener('mouseup', stopDrag);
        window.addEventListener('touchend', stopDrag);
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('touchmove', onDrag, { passive: false });
    });
    
    // Ano atual no footer
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});
