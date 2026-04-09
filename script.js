document.addEventListener('DOMContentLoaded', () => {
    const revealItems = document.querySelectorAll('.reveal');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = [...document.querySelectorAll('section[id]')];

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.18,
        rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index * 0.08, 0.4)}s`;
        revealObserver.observe(item);
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) {
                return;
            }

            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const setActiveLink = () => {
        const scrollPosition = window.scrollY + 160;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (!link) {
                return;
            }

            if (scrollPosition >= top && scrollPosition < bottom) {
                navLinks.forEach((item) => item.classList.remove('active'));
                link.classList.add('active');
            }
        });
    };

    setActiveLink();
    window.addEventListener('scroll', setActiveLink, { passive: true });
});
