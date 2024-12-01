// ---------------------------------------------------------------------------------------------------------------
// Функція для ініціалізації аккордеонів
// ---------------------------------------------------------------------------------------------------------------

export function initAccordion() {
    // ---------------------------------------------------------------------------------------------------------------
    // Знаходимо всі заголовки аккордеонів
    const accordions = document.querySelectorAll(".accordion__header");
    // Знаходимо всі елементи аккордеонів
    const allItems = document.querySelectorAll(".accordion__item");
    // ---------------------------------------------------------------------------------------------------------------

    // ---------------------------------------------------------------------------------------------------------------А
    // Функція для переключення аккордеону
    const toggleAccordion = (accordion) => {
        // Отримуємо батьківський елемент (аккордеон)
        const currentItem = accordion.parentElement;
        // Перевіряємо, чи активний поточний елемент
        const isActive = currentItem.classList.contains("accordion__item--active");

        // Закриваємо всі аккордеони, які не є поточним
        allItems.forEach((item) => {
            if (item !== currentItem) {
                item.classList.remove("accordion__item--active");
                item.querySelector(".accordion__content").style.maxHeight = null;
            }
        });

        // Якщо поточний елемент не активний, відкриваємо його
        if (!isActive) {
            currentItem.classList.add("accordion__item--active");
            const content = currentItem.querySelector(".accordion__content");
            // Встановлюємо max-height на основі висоти контенту
            content.style.maxHeight = `${content.scrollHeight}px`;
        }
    };

    // Додаємо обробник подій для кожного заголовка аккордеону
    accordions.forEach((accordion) => {
        accordion.addEventListener("click", () => toggleAccordion(accordion));
    });

    // Активуємо перший аккордеон за замовчуванням
    if (allItems.length > 0) {
        const firstAccordion = allItems[0];
        firstAccordion.classList.add("accordion__item--active");
        const firstContent = firstAccordion.querySelector(".accordion__content");
        // Встановлюємо max-height для першого аккордеону
        firstContent.style.maxHeight = `${firstContent.scrollHeight}px`;
    }
}

// ---------------------------------------------------------------------------------------------------------------
// Приклад використання аккордіону
/*<div class="accordion">
    <div class="accordion__item">
        <div class="accordion__header">Заголовок 1</div>
        <div class="accordion__content">
            <p>Контент для заголовка 1.</p>
        </div>
    </div>
    <div class="accordion__item">
        <div class="accordion__header">Заголовок 2</div>
        <div class="accordion__content">
            <p>Контент для заголовка 2.</p>
        </div>
    </div>
    <div class="accordion__item">
        <div class="accordion__header">Заголовок 3</div>
        <div class="accordion__content">
            <p>Контент для заголовка 3.</p>
        </div>
    </div>
</div> */
// ---------------------------------------------------------------------------------------------------------------
