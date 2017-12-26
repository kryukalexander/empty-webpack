import style from './css/style.scss';

class Car {
    manufacturer(car) {
        console.log(`I have a ${car}`)
    }
}

const bmw = new Car;
bmw.manufacturer('bmw');