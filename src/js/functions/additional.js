const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const root = document.documentElement;
const btnLight = document.getElementById('theme-light');
const btnDark = document.getElementById('theme-dark');

// Встановлення теми
function setTheme(theme) {
    if (theme === 'dark') {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        btnDark.style.display = 'none';
        btnLight.style.display = 'inline-block';
    } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        btnLight.style.display = 'none';
        btnDark.style.display = 'inline-block';
    }
}

// Перевірка локального сховища або системної теми
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme(prefersDark ? 'dark' : 'light');
}

// Обробники
btnLight.addEventListener('click', () => setTheme('light'));
btnDark.addEventListener('click', () => setTheme('dark'));


// -----------------
document.addEventListener('DOMContentLoaded', () => {
    const anchorsContainer = document.getElementById('anchors');
    const headings = document.querySelectorAll('[data-anchors]');

    // Якщо на сторінці немає елементів з якорями, припиняємо виконання
    if (headings.length === 0 || !anchorsContainer) {
        return;
    }

    // Створення якорів
    headings.forEach(heading => {
        const anchorId = heading.getAttribute('data-anchors');
        heading.id = anchorId;

        const anchorLink = document.createElement('a');
        anchorLink.classList.add('anchors__item');
        anchorLink.href = `#${anchorId}`;
        anchorLink.textContent = heading.textContent;

        anchorsContainer.appendChild(anchorLink);
    });

    // Оновлення активного якоря
    function updateActiveAnchor() {
        const scrollY = window.scrollY;
        let currentSection = null;

        // Перевірка, чи scrollY знаходиться всередині якоїсь секції
        headings.forEach(heading => {
            const sectionTop = heading.offsetTop;
            const sectionHeight = heading.offsetHeight;
            if (scrollY >= sectionTop - 50 && scrollY < sectionTop + sectionHeight) {
                currentSection = heading.getAttribute('data-anchors');
            }
        });

        // Якщо не знайшли активну — шукаємо найближчу
        if (!currentSection) {
            let closest = null;
            let minDistance = Infinity;

            headings.forEach(heading => {
                const distance = Math.abs(heading.offsetTop - scrollY);
                if (distance < minDistance) {
                    minDistance = distance;
                    closest = heading.getAttribute('data-anchors');
                }
            });

            currentSection = closest;
        }

        // Застосування активного класу
        const activeLink = anchorsContainer.querySelector(`a[href="#${currentSection}"]`);
        if (activeLink) {
            const allAnchors = anchorsContainer.querySelectorAll('.anchors__item');
            allAnchors.forEach(anchor => anchor.classList.remove('anchors__item--active'));
            activeLink.classList.add('anchors__item--active');
        }
    }

    // Клік по якірному посиланню
    anchorsContainer.addEventListener('click', (e) => {
        if (e.target && e.target.tagName === 'A') {
            e.preventDefault();

            const allAnchors = anchorsContainer.querySelectorAll('.anchors__item');
            allAnchors.forEach(anchor => anchor.classList.remove('anchors__item--active'));
            e.target.classList.add('anchors__item--active');

            const targetId = e.target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
                history.pushState(null, null, `#${targetId}`);
            }
        }
    });

    // Прив'язка скролу
    window.addEventListener('scroll', updateActiveAnchor);

    // Встановлюємо активний якір одразу після завантаження
    updateActiveAnchor();
});


// ----------------------------------------



