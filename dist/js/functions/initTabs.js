export function initTabs() {
    const buttons = document.querySelectorAll('.tabs__button');
    const contents = document.querySelectorAll('.tabs__content');
  
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('tabs__button--active'));
        contents.forEach(content => content.classList.remove('tabs__content--active'));
  
        button.classList.add('tabs__button--active');
        contents[index].classList.add('tabs__content--active');
      });
    });
  }

/*
<div class="tabs">
    <div class="tabs__buttons">
        <button class="tabs__button tabs__button--active">Tab 1</button>
        <button class="tabs__button">Tab 2</button>
        <button class="tabs__button">Tab 3</button>
    </div>
    
    <div class="tabs__content tabs__content--active">Content for Tab 1</div>
    <div class="tabs__content">Content for Tab 2</div>
    <div class="tabs__content">Content for Tab 3</div>
</div>
*/