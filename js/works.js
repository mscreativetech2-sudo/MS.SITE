// Works Filtering Logic

document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projects.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projects.forEach(project => {
                    if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                        project.classList.remove('hide');
                        // Small animation effect
                        project.style.animation = 'none';
                        project.offsetHeight; /* trigger reflow */
                        project.style.animation = null; 
                    } else {
                        project.classList.add('hide');
                    }
                });
            });
        });
    }
});
