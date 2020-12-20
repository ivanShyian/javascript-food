function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector); // Ссылка
    const tabContent = document.querySelectorAll(tabsContentSelector); // Контент
    const tabParent = document.querySelector(tabsParentSelector); // Родитель ссылки

    // Прячем контент
    const hideContent = () => {
        tabContent.forEach((i) => {
            i.classList.remove('show');
            i.classList.add('hide');
        });

        tabs.forEach(i => i.classList.remove(activeClass));
    };
    // Показываем контент
    const showContent = (id = 0) => {
        tabContent[id].classList.remove('hide');
        tabContent[id].classList.add('show');
        tabs[id].classList.add(activeClass);
    };

    hideContent();
    showContent();

    // Обрабатываем клик на ссылку
    tabParent.addEventListener('click', (elem) => {
        const target = elem.target;
        if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, id) => {
                if (target === item) { // Проверяем на совпадение при нажатии
                    hideContent();
                    showContent(id);
                }
            });
        }
    });
}
export default tabs;