export function currentPage() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allLinks = document.querySelectorAll('.sidebar__link, .dropdown__link');

  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');

      let parentContent = link.closest('.dropdown__content');
      while (parentContent) {
        const dropdown = parentContent.closest('.dropdown');
        if (!dropdown) break;

        const title = dropdown.querySelector('.dropdown__title');
        if (title) {
          title.classList.add('active-title');
        }

        dropdown.classList.add('dropdown--active'); 

        parentContent = dropdown.closest('.dropdown__content');
      }
    }
  });
}
