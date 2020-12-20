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
             // round Округляет
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
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
        }));
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
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}
export default calc;