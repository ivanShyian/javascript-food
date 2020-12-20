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

export default timer;
