//Model

const model = {
    currentCar: null,
    cars: [
        {
            clickCount: 0,
            name: 'Coupe Maserati',
            imgSrc: 'img/black-convertible-coupe.jpg',
        },
        {
            clickCount: 0,
            name: 'Camaro SS 1LE',
            imgSrc: 'img/chevrolet-camaro.jpg',
        },
        {
            clickCount: 0,
            name: 'Dodger Charger 1970',
            imgSrc: 'img/dodge-charger.jpg',
        },
        {
            clickCount: 0,
            name: 'Ford Mustang 1966',
            imgSrc: 'img/ford-mustang.jpg',
        },
        {
            clickCount: 0,
            name: '190 SL Roadster 1962',
            imgSrc: 'img/mercedes-benz.jpg',
        },

    ]
}

//Controller
const controller = {
    init(){
        model.currentCar = model.cars[0];
        carView.init();
        carListView.init();
    },
    getCurrentCar(){
        return model.currentCar;
    },
    getCars(){
        return model.cars;
    },
    setCurrentCar(car){
        model.currentCar = car;
    },
    incrementCount(){
        model.currentCar.clickCount += 1;
        carView.render();
    }
}

//View
const carView = {
    init(){
        this.carName = document.getElementById('car-name');
        this.carImage = document.getElementById('car-image');
        this.carImage.addEventListener('click', this.clickHandler);
        this.carCount = document.getElementById('car-count');
        this.render();
    },
    clickHandler(){
        return controller.incrementCount();
    },
    render(){
        let currentCar = controller.getCurrentCar();
        this.carName.textContent = currentCar.name;
        this.carCount.textContent = currentCar.clickCount;
        this.carImage.src = currentCar.imgSrc;
    }
}

const carListView = {
    init(){
        this.carList = document.getElementById('car-list');
        this.render();
    },
    render(){
        const allCars = controller.getCars();
        this.carList.innerHTML = '';
        this.carBadge = 0;
        for(let i = 0; i < allCars.length; i++){
            let car = allCars[i];
            let x = document.createElement('li');
            let y = document.createElement('span');
            x.className = 'list-group-item';
            x.innerHTML = car.name;
            y.className = 'badge';
            y.innerHTML = this.carBadge;
            x.addEventListener('click', function(car){
                return function(){
                    controller.setCurrentCar(car);
                    carView.render();
                    this.carBadge = carView.carCount.textContent;
                    y.innerHTML = this.carBadge;
                };
            }(car));
            x.appendChild(y);
            this.carList.appendChild(x);
        }
    }
}

controller.init();

