import {getResource} from '../services/services';

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
    getResource('http://localhost:3000/menu').then(data => {
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
export default cards;