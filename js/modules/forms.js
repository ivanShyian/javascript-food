import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalInterval) {
    const forms = document.querySelectorAll(formSelector); // Получаем формы

    const message = { // Отображаемый контент при работе сервера
        loading: 'img/form/spinner.svg',
        success: 'Thanks, we will call you soon',
        failure: 'Something gone wrong',
    };

    forms.forEach(item => {
        bindPostData(item); // Получаем каждую форму и передаем в функцию
    });

    // Функция передачи данных
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img'); // Контент, который мы отобразим
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
               display: block;
               margin: 0 auto;
           `; // Дает возможность вписать css styles (inline-format)
            form.insertAdjacentElement('afterend', statusMessage); // гибкий append

            // Создаем обьект
            const formData = new FormData(form);
            // Переобразовываем в Json
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // Fetch it
            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data); // отображаем в консоль текстовый ответ
                    showSuccessModal(message.success); // Отображаем успешность
                    statusMessage.remove(); // Удаляем спинер
                })
                .catch(() => {
                    showSuccessModal(message.failure); // Отображаем ошибку
                })
                .finally(() => {
                    form.reset(); // Обнуляем форму
                });
        });
    }

    function showSuccessModal(message) {
        // Скрываем основное модальное окно
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        openModal('.modal', modalInterval); // открываем новое окно

        // Создаем новое окно
        const successModal = document.createElement('div');
        successModal.classList.add('modal__dialog');
        successModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        // Добавляем новое окно
        document.querySelector('.modal').append(successModal);
        // После отрабтки удаляем окно и возобновляем работу старого
        setTimeout(() => {
            successModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
}
export default forms;