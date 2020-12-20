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

        });
    });

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

export default slider;