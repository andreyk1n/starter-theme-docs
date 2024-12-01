// ---------------------------------------------------------------------------------------------------------------
// Функціонал для бургер меню. 
// ---------------------------------------------------------------------------------------------------------------

// export function initBurgerMenu() {
//     document.addEventListener('DOMContentLoaded', () => {
//         // ---------------------------------------------------------------------------------------------------------------
//         // Класи до яких ми будемо доступатись
//         // ---------------------------------------------------------------------------------------------------------------
//         const burger = document.querySelector('.header__burger');
//         const nav = document.querySelector('.header__nav');
//         const body = document.body; // Доступ до body

//         // ---------------------------------------------------------------------------------------------------------------
//         // При кліці на бургер додаємо клас .active для .header__burger, .header__nav та блокуємо скрол сторінки
//         // ---------------------------------------------------------------------------------------------------------------
//         burger.addEventListener('click', () => {
//             burger.classList.toggle('active');
//             nav.classList.toggle('active');

//             if (burger.classList.contains('active')) {
//                 body.classList.add('no-scroll'); // Заборона скролу
//             } else {
//                 body.classList.remove('no-scroll'); // Відновлення скролу
//             }
//         });
//     });
// }

// beta version
export function initBurgerMenu() {
    document.addEventListener('DOMContentLoaded', () => {
        // ---------------------------------------------------------------------------------------------------------------
        // Класи до яких ми будемо доступатись
        // ---------------------------------------------------------------------------------------------------------------
        const burger = document.querySelector('.header__burger');
        const nav = document.querySelector('.header__nav');
        const body = document.body; // Доступ до body

        // ---------------------------------------------------------------------------------------------------------------
        // При кліці на бургер додаємо клас .active для .header__burger, .header__nav та блокуємо скрол сторінки
        // ---------------------------------------------------------------------------------------------------------------
        burger.addEventListener('click', (event) => {
            event.stopPropagation(); // Зупиняємо подію, щоб клік на бургер не закрив меню
            burger.classList.toggle('active');
            nav.classList.toggle('active');

            if (burger.classList.contains('active')) {
                body.classList.add('no-scroll'); // Заборона скролу
            } else {
                body.classList.remove('no-scroll'); // Відновлення скролу
            }
        });

        // ---------------------------------------------------------------------------------------------------------------
        // Закриття меню при кліці поза його межами
        // ---------------------------------------------------------------------------------------------------------------
        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target) && !burger.contains(event.target)) {
                if (nav.classList.contains('active')) {
                    burger.classList.remove('active');
                    nav.classList.remove('active');
                    body.classList.remove('no-scroll');
                }
            }
        });
    });
}

// ---------------------------------------------------------------------------------------------------------------

// min code version for delpoy

// export function initBurgerMenu() {
//     document.addEventListener('DOMContentLoaded', () => {
//         const burger = document.querySelector('.header__burger');
//         const nav = document.querySelector('.header__nav');
//         const body = document.body;

//         const toggleMenu = () => {
//             const isActive = burger.classList.toggle('active');
//             nav.classList.toggle('active', isActive);
//             body.classList.toggle('no-scroll', isActive);
//         };

//         burger.addEventListener('click', (e) => {
//             e.stopPropagation();
//             toggleMenu();
//         });

//         document.addEventListener('click', (e) => {
//             if (!nav.contains(e.target) && !burger.contains(e.target)) {
//                 burger.classList.remove('active');
//                 nav.classList.remove('active');
//                 body.classList.remove('no-scroll');
//             }
//         });
//     });
// }