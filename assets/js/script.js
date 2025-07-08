
        document.addEventListener('DOMContentLoaded', () => {
            const navbar = document.querySelector('.navbar');
            const carouselContainer = document.querySelector('.carousel-container');
            const track = document.querySelector('.carousel-track');
            const slides = Array.from(track ? track.children : []);
            const nextButton = document.querySelector('#nextBtn');
            const prevButton = document.querySelector('#prevBtn');
            let slideWidth = slides.length > 0 ? slides[0].getBoundingClientRect().width : 0;
            let currentIndex = 0;
            let autoPlayInterval;

            window.addEventListener('scroll', () => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
            });

            const moveToSlide = (targetIndex) => {
                if (track) {
                    track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
                    currentIndex = targetIndex;
                }
            };

            const startAutoPlay = () => {
                stopAutoPlay();
                autoPlayInterval = setInterval(() => {
                    const nextIndex = (currentIndex + 1) % slides.length;
                    moveToSlide(nextIndex);
                }, 6000);
            };

            const stopAutoPlay = () => { clearInterval(autoPlayInterval); };

            if (slides.length > 0) {
                if (nextButton) nextButton.addEventListener('click', () => {
                    stopAutoPlay();
                    moveToSlide((currentIndex + 1) % slides.length);
                    startAutoPlay();
                });
                if (prevButton) prevButton.addEventListener('click', () => {
                    stopAutoPlay();
                    moveToSlide((currentIndex - 1 + slides.length) % slides.length);
                    startAutoPlay();
                });
                if (carouselContainer) {
                    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
                    carouselContainer.addEventListener('mouseleave', startAutoPlay);
                }
                startAutoPlay();
            }

            window.addEventListener('resize', () => {
                if (slides.length > 0) {
                    slideWidth = slides[0].getBoundingClientRect().width;
                    moveToSlide(currentIndex);
                }
            });

            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-links a');
            const navObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        navLinks.forEach(link => link.classList.remove('active'));
                        const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                        if(activeLink) activeLink.classList.add('active');
                    }
                });
            }, { rootMargin: '-50% 0px -50% 0px' });
            sections.forEach(section => navObserver.observe(section));

            const revealElements = document.querySelectorAll('.reveal');
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            revealElements.forEach(el => revealObserver.observe(el));
        });
