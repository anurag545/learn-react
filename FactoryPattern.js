class Vehicle {
    constructor(type) {
        this.type = type
    }
    isVehicleWorking () {
        console.log("working");
    }
}

class Car extends Vehicle {
    constructor() {
        super('car');
    }
    drive () {
        console.log("driving")
    }
}

class Bike extends Vehicle {
    constructor() {
        super('bike');
    }
    ride () {
        console.log("riding")
    }
}

class VehicleFactory {
    constructor() {
        this.vehicleType = {
            car: Car,
            bike: Bike
        }
    }
    createVehicle (type) {
        if(this.vehicleType[type]) {
            return new this.vehicleType[type]();
        }else {
            throw new Error(`Invalid vehicle type: ${type}`);
        }
    }
}

const factory = new VehicleFactory();
const myCar = factory.createVehicle('car');
console.log(myCar.drive(), myCar.isVehicleWorking());
const myBike = factory.createVehicle('bike');
console.log(myBike.ride(), myBike.isVehicleWorking());