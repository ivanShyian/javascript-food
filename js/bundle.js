/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function calc() {
    let sex, height, weight, age, ratio;

    // Результат span
    const result = document.querySelector('.calculating__result span');
    // Если в локальном хранилищи есть, то
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        // Если нет, то добавляем дэфолт
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    // Обраобтка локального хранилища
    function initLocalSettings(selector, activeClass) {
        // Таким образом можем обрабатывать разные классы
        const elements = document.querySelectorAll(selector);
        // Удаляем активный класс везде
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            // Проверяем, если значение id равно значению в локалке "sex"
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                // Добавляем класс активности на него
                elem.classList.add(activeClass);
            }
            // Проверяем, если значение атрибута data-ratio равно значению в локалке "ratio"
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active'); // вызываем для первого блока
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active'); // для второго

    // Функция, которая обрабатывает данные
    function calcTotal() {
        // Если значений нет, то ___
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '___';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio); // round Округляет
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    // Вешаем обработичики на пол и активность
    // Обрабатываем ДВА БЛОКА
    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector); // Получаем кнопки div
        // Записываем коэф активности и пол
        elements.forEach(elem => elem.addEventListener('click', e => {
            if (e.target.getAttribute('data-ratio')) { // Если клик по элементу с атрибутом, то..
                ratio = +e.target.getAttribute('data-ratio'); // Присваеваем значение атрибута(html)
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); // Вносим в локалку
            } else {
                sex = e.target.getAttribute('id'); // Также
                localStorage.setItem('sex', e.target.getAttribute('id'));
            }
            elements.forEach(item => item.classList.remove(activeClass)); // Удаляем класс активности со всех элем
            e.target.classList.add(activeClass); // Добавляем активность на то, что кликнули
            calcTotal();
        }))
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active'); // вызываем для первого блока
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active'); // для второго

    // Получаем значения элементов из инпута
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) { // Если в инпуте есть буквы (не номера)
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
                switch (input.getAttribute('id')) { // Если айди = case
                    case 'height':
                        height = +input.value;
                        break;
                    case 'weight':
                        weight = +input.value;
                        break;
                    case 'age':
                        age = +input.value;
                        break;
                }
            }

            calcTotal();
        })
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards() {
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

    // CLEAR FETCH
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu').then(data => {
        data.forEach(obj => {
            const {img, altimg, title, descr, price} = obj;
            new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
        });
    });
    // // AXIOS
    // axios.get('http://localhost:3000/menu').then(data => {
    //     data.data.forEach(obj => {
    //         const {img, altimg, title, descr, price} = obj;
    //         new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });
    //
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



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
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalInterval); // открываем новое окно

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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "openModal": () => /* binding */ openModal,
/* harmony export */   "closeModal": () => /* binding */ closeModal
/* harmony export */ });
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
        btn.addEventListener('click', () => openModal(modalSelector, modalInterval))
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCount, currentCounter, wrapper, field}) {
    const slider = document.querySelector(container),
        sliderWrapper = slider.querySelector(wrapper),
        sliderInner = slider.querySelector(field),
        slides = slider.querySelectorAll(slide),
        prev = slider.querySelector(prevArrow),
        next = slider.querySelector(nextArrow),
        total = document.querySelector(totalCount),
        current = document.querySelector(currentCounter),

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
        if (offset === replaceString(width) * (slides.length - 1)) { // Number.parseInt(width)
            offset = 0;
        } else {
            // При нажатии вперед к Offset прибавляется ширина каждого слайда
            offset += replaceString(width); // Удаляем пискели через слайд
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
            offset = replaceString(width) * (slides.length - 1);
        } else {
            // При нажатии назад
            offset -= replaceString(width);
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
            offset = replaceString(width) * (slideTo - 1); // Выставляем позицию слайдов
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

    function replaceString(str) {
        return +str.replace(/\D/g, '');
    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function timer(id, deadline) {
    // Получаем переменные времени
    function getTime(deadline) {
        const time = Math.floor(new Date(deadline)) - Math.floor(new Date()),
            days = Math.floor(time / (1000 * 60 * 60 * 24)),
            hours = Math.floor(time / (1000 * 60 * 60) % 24),
            minutes = Math.floor(time / (1000 * 60) % 60),
            seconds = Math.floor(time / 1000 % 60);

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
            if (num < 10) {
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
    setClock(id, deadline);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









document.addEventListener('DOMContentLoaded', () => {
    // Таймаут появления модалки () => openModal(modalSelector, modalInterval)
    const modalInterval = setTimeout( () => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)('.modal', modalInterval), 50000);
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__.default)('.timer', '2020-12-21');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.default)('[data-modal]', '.modal', modalInterval);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.default)('form', modalInterval);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCount: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__.default)();
});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "getResource": () => /* binding */ getResource
/* harmony export */ });
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

const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Coudn't fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
};








/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map