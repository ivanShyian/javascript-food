document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'); // Ссылка
    const tabContent = document.querySelectorAll('.tabcontent'); // Контент
    const tabParent = document.querySelector('.tabheader__items'); // Родитель ссылки
    const _active = 'tabheader__item_active';

    // Tabs===================================================
    // Прячем контент
    const hideItems = () => {
        tabContent.forEach((i) => {
            i.classList.remove('show');
            i.classList.add('hide');
        });

        tabs.forEach(i => i.classList.remove(_active));
    };
    // Показываем контент
    const showItems = (i = 0) => {
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show');

        tabs[i].classList.add(_active);
    };
    hideItems();
    showItems();

    // Обрабатываем клик на ссылку
    tabParent.addEventListener('click', (elem) => {
        const target = elem.target;
        tabs.forEach((item, id) => {
            if (target === item) { // Проверяем на совпадение при нажатии
                hideItems();
                showItems(id);
            }
        });
    });
    // =================================================
    // Timer
    const _deadline = "2020-12-17 00:00";

    // Получаем переменные времени
    function getTime(deadline) {
        const time = Math.floor(new Date(deadline)) - Math.floor(new Date()),
            days = Math.floor(time / (1000 * 60 * 60 * 24)),
            hours = Math.floor(time / (1000 * 60 * 60) % 24),
            minutes = Math.floor(time / (1000 * 60) % 60),
            seconds = Math.floor((time / 1000) % 60);

        return {
            time,
            days,
            hours,
            minutes,
            seconds,
        };
    }

    // Часы
    function setClock(clock, deadline) {
        const timer = document.querySelector(clock),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            interval = setInterval(updateClock, 1000);

        updateClock();

        // Добавляем ноль перед значением
        function getZero(num) {
            if (num <= 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }

        // Обновляем функцию
        function updateClock() {
            const t = getTime(deadline);
            if (t.time <= 0) {
                clearInterval(interval);
            } else {
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);
            }
        }
    }

    setClock('.timer', _deadline);
    // ====================================================
    // Modal window
    const modal = document.querySelector('.modal'),
        modalBtn = document.querySelectorAll('[data-modal]');

    // Показываем / прячем модальное окно
    function openModal() {
        modal.classList.remove('hide');
        modal.classList.add('show');
        document.body.classList.add('hidden-overflow');
        clearInterval(modalInterval); // Очищаем модальное окно если пользователь открыл сам
    }

    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.classList.remove('hidden-overflow');
    }

    // Показываем модальное окно в конце страницы
    function endPageModal() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document // pageYofset - тек полож на стp по Y
            .documentElement.scrollHeight) { // clientHeight = размер высоты окна и scrollHeight - высота всей страницы
            openModal();
            window.removeEventListener('scroll', endPageModal);
        }
    }

    // Таймаут появления модалки
    const modalInterval = setTimeout(openModal, 50000);
    // Обработчик кнопок
    modalBtn.forEach(btn => btn.addEventListener('click', () => {
        openModal();
    }));
    // Нажатие на крестик модального
    // Закрытие модального по темной области
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') { //data-close - наш крестик
            closeModal();
        }
    });
    // Закрытие модального по кнопке
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    });
    // Обработчик появления модального при скролле
    window.addEventListener('scroll', endPageModal);
    //======================================================
    // CLASSES
    class MenuItem {
        constructor(src, alt, heading, descr, price, parent, ...classes) { // classes вместит в себя n-классов
            this.src = src;
            this.alt = alt;
            this.heading = heading;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parent); // Получаем родительский контейнер
            this.transfer = 27;
            this.changeToUAH(); // Делаем вычисление

        }

        changeToUAH() {
            this.price = this.price * this.transfer; // new Price возвращается в конструктор
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) { // Если длинна массива с классами 0, то..
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            // element = <div class="..."></div>
            element.innerHTML = ` 
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.heading}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
                `;
            this.parent.append(element);
        }
    }

    // const getResource = async (url) => {
    //     const res = await fetch(url);
    //     if (!res.ok) {
    //         throw new Error(`Coudn't fetch ${url}, status: ${res.status}`);
    //     }
    //     return await res.json();
    // };
    // getResource('http://localhost:3000/menu').then(data => {
    //     data.forEach(obj => {
    //         const {img, altimg, title, descr, price} = obj;
    //         new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });
    // AXIOS
    axios.get('http://localhost:3000/menu').then(data => {
        data.data.forEach(obj => {
            const {img, altimg, title, descr, price} = obj;
            new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

    // ==== ADD ELEMENTS WITHOUT PATTERNS SUCH A CLASS
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach((obj) => {
    //         const {
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price
    //         } = obj;
    //         const currentPrice = price * 28;
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //                 <h3 class="menu__item-subtitle">${title}</h3>
    //                 <div class="menu__item-descr">${descr}</div>
    //                 <div class="menu__item-divider"></div>
    //                 <div class="menu__item-price">
    //                     <div class="menu__item-cost">Цена:</div>
    //                     <div class="menu__item-total"><span>${currentPrice}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

    // FORMS === Fetch ============================================================================
    // WITH FETCH ASYNC/WAIT
    const forms = document.querySelectorAll('form'); // Получаем формы

    const message = { // Отображаемый контент при работе сервера
        loading: 'img/form/spinner.svg',
        success: 'Thanks, we will call you soon',
        failure: 'Something gone wrong',
    };

    forms.forEach(item => {
        bindPostData(item); // Получаем каждую форму и передаем в функцию 
    });
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
        });
        return await res.json();
    };

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
        openModal(); // открываем новое окно 

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
            closeModal();
        }, 4000);
    }

//======= SLIDER ========================================================

    const slider = document.querySelector('.offer__slider'),
        sliderWrapper = slider.querySelector('.offer__slider-wrapper'),
        sliderInner = slider.querySelector('.offer__slider-inner'),
        slides = slider.querySelectorAll('.offer__slide'),
        prev = slider.querySelector('.offer__slider-prev'),
        next = slider.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),

        width = window.getComputedStyle(sliderWrapper).width; // Ширина видимого блока

    // index and offset(Отступ)
    let slideIdx = 1; // начальный индекс
    let offset = 0; // начальная щиринп

    // Добавляем стили к оболочке слайдов
    sliderInner.style.width = 100 * slides.length + '%'; // Ширина равна 100*кол-во слайдов + %
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.5s all';
    sliderWrapper.style.overflow = 'hidden'; // Скрываем всё, что не вписывается в ширину окна

    // Прибавляем нули в счётчик в дефолтном состоянии
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIdx}`;
    } else {
        total.textContent = `${slides.length}`;
    }

    // Перебираем слайды и назначаем всем одинаковую ширину
    slides.forEach((slide) => {
        slide.style.width = width; // Ширина computedStyle = sliderWrapper
    });


    // === Точки слайдера
    slider.style.position = 'relative'; // Делаем весь слайдер relative
    // Создаем обертку точек
    const indicators = document.createElement('ol');

    const dotsArr = []; // Массив, куда будут помещаться точки

    // Добавляем css класс
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    // Цикл, который создаст нужное кол-во точек
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');  // Точка
        dot.classList.add('dot');

        // Атрибут, который будет говорить о том, чтобы конкретная точка шла к конкретному слайду
        dot.setAttribute('data-slide-to', i + 1); // data-slide-to="i"

        // Добавляем визуальную активность для первого слайда
        if (i === 0) {
            dot.style.opacity = '1';
        }
        indicators.append(dot); // Добавляем точки внутрь обертки
        dotsArr.push(dot); // Пушим массив нашими точками
    }

    // Next button
    next.addEventListener('click', () => {
        // Если отступ == ширине слайда(обрезаем px через slice) * на кол-во слайдов, то отступ в позицию 0
        if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) { // Number.parseInt(width)
            offset = 0;
        } else {
            // При нажатии вперед к Offset прибавляется ширина каждого слайда
            offset += +width.slice(0, width.length - 2); // Удаляем пискели через слайд
        }
        // Таким образом происходит перемещение
        translateXStyle(sliderInner);
        // Если индекс равен количеству слайдов, то есть
        if (slideIdx === slides.length) {
            slideIdx = 1;
        } else {
            slideIdx++;
        }
        getZero(current);
        // Каждому элементу в массиве даем прозрачность .5
        dotOpacity();
    });

    // Prev button
    prev.addEventListener('click', () => {
        // Когда отступ в начальном положении, то при нажатии назад
        if (offset === 0) { //width = 0
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            // При нажатии назад
            offset -= +width.slice(0, width.length - 2);
        }
        translateXStyle(sliderInner);

        if (slideIdx === 1) {
            slideIdx = slides.length;
        } else {
            slideIdx--;
        }
        getZero(current);
        dotOpacity();
    });
    // Перебор массива
    dotsArr.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = +e.target.getAttribute('data-slide-to'); // Получаем значение атрибута точки

            slideIdx = slideTo; // Присваеваем индексу значение атрибута точки
            offset = +width.slice(0, width.length - 2) * (slideTo - 1); // Выставляем позицию слайдов
            translateXStyle(sliderInner);
            getZero(current);
            dotOpacity();

        })
    })

    function translateXStyle(element) {
        element.style.transform = `translateX(-${offset}px)`;
    }

    function getZero(element) {
        if (slides.length < 10) {
            element.textContent = `0${slideIdx}`;
        } else {
            element.textContent = slideIdx;
        }
    }

    function dotOpacity() {
        dotsArr.forEach(dot => dot.style.opacity = '.5');
        dotsArr[slideIdx - 1].style.opacity = 1;
    }
});