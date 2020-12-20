// Показываем модальное окно
function openModal(modalSelector, modalInterval) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    if (modalInterval) {
        clearInterval(modalInterval); // Очищаем модальное окно если пользователь открыл сам
    }
}

// Прячем модальное окно
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalInterval) {
    const modal = document.querySelector(modalSelector),
        modalBtn = document.querySelectorAll(triggerSelector);

    // Обработчик кнопок
    modalBtn.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalInterval));
    });
    // Нажатие на крестик модального
    // Закрытие модального по темной области
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') { //data-close - наш крестик
            closeModal(modalSelector);
        }
    });
    // Закрытие модального по кнопке
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
    // Показываем модальное окно в конце страницы
    function endPageModal() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document // pageYofset - тек полож на стp по Y
            .documentElement.scrollHeight) { // clientHeight = размер высоты окна и scrollHeight - высота всей страницы
            openModal(modalSelector, modalInterval);
            window.removeEventListener('scroll', endPageModal);
        }
    }
    // Обработчик появления модального при скролле
    window.addEventListener('scroll', endPageModal);
}
export default modal;
export {openModal, closeModal};