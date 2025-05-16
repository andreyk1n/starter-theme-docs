export function currentPage() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allLinks = document.querySelectorAll('.sidebar__link, .dropdown__link');
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
            let parent = link.closest('.dropdown__content');
            while (parent) {
                const dropdown = parent.closest('.dropdown');
                if (!dropdown) break;
                const title = dropdown.querySelector('.dropdown__title');
                if (title) title.classList.add('active-title');
                parent = dropdown.closest('.dropdown__content');
            }
        }
    });
}