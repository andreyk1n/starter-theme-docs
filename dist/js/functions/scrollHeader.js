// ---------------------------------------------------------------------------------------------------------------
// Для коректної роботи хедер має мати клас .header, position: fixed, і решту стилів які прописані в темі 
// саме для хедера
// ---------------------------------------------------------------------------------------------------------------
export function initScrollControlledHeader() {

  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    document.querySelector('.header').style.top = (scrollTop <= 10 || scrollTop < lastScrollTop) ? '0' : '-100px';
    lastScrollTop = scrollTop;
  });

}
// ---------------------------------------------------------------------------------------------------------------


