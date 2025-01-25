// ---------------------------------------------------------------------------------------------------------------
// Тут зібрані підключення усіх джаваскрипт компонентів, які можуть знадобитись в роботі. 
// Приклад використання зазвичай знаходиться в самому скрипті компоненту.
// ---------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------

// Підключення відстеження елементів для анімації. Інструкція знаходиться тут --> ./functions/elementWatcher.js
import { initializeElementWatcher } from './functions/elementWatcher.js';
// Ініціалізація відстеження елементів для анімації.
initializeElementWatcher();

// ---------------------------------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------------------------------
// Підключення функціоналу адаптивного переміщення елементів верстки. 
// Інструкція знаходиться тут --> ./functions/moveTo.js
// ---------------------------------------------------------------------------------------------------------------
// import moveElements from './functions/moveTo.js';
// Викликаємо функцію moveElements
// moveElements();
// 
// ---------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------
// Підключення функціоналу бургер меню, по замовчуванню додає клас .active .header__burger i .header__nav
// Інструкція знаходиться тут --> ./js_components/initBurgerMenu.js
// ---------------------------------------------------------------------------------------------------------------

import { initBurgerMenu } from './functions/initBurgerMenu.js';
// Викликаємо функцію initBurgerMenu
initBurgerMenu();

// ---------------------------------------------------------------------------------------------------------------
// Підключення функціоналу аккордіону
// import { initAccordion } from './functions/accordion.js';
// Викликаємо аккордіон
// initAccordion();
// Також необхідно підключати стилі окремо
// ---------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------
// Підключення функціонал скролл хедера
// import { initScrollControlledHeader } from './functions/scrollHeader.js';
// Викликаємо скролл хедера
// initScrollControlledHeader();
// ---------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------
// Підключення функціоналу табів
// import { initTabs } from './functions/initTabs.js';
// Виклик функціоналу табів
//   initTabs();
// ---------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------
// Підключення анімації цифрового лічильника
// import { initializeCounters } from './functions/numberCounter.js';

// Виклик анімації цифрового лічильника
// initializeCounters();

// ---------------------------------------------------------------------------------------------------------------
// Підключення функціоналу автоматичного таймеру для модального вікна
// import { initializeModalTriggers } from './functions/modalTimer.js';
// ---------------------------------------------------------------------------------------------------------------

// initializeModalTriggers();
// ---------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------
// Підключення функціоналу кастомного селекту
// import { selectMenu } from './functions/selectMenu.js';
// ---------------------------------------------------------------------------------------------------------------

// selectMenu();
// ---------------------------------------------------------------------------------------------------------------
