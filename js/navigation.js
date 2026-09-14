// Navigation and Header Scripts

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const header = document.getElementById('header');

    // Mobile Menu Toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle body scroll
            if(navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when a link is clicked
    const links = navLinks?.querySelectorAll('a');
    if (links) {
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger?.classList.remove('active');
                navLinks?.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });

    // Set active link based on current URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (links) {
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }
});
