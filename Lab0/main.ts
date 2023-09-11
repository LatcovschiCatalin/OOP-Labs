class Car {
    private speed: number = 0;
    private isMoving: boolean = false;

    constructor(speed: number, isMoving: boolean) {
        this.speed = speed;
        this.isMoving = isMoving;
    }

    public stop() {
        this.isMoving = false;
    }

    public accelerate(speedAmount: number) {
        this.speed += speedAmount;
        this.isMoving = this.speed != 0;
    }

    public printSpeed() {
        console.log("Speed " + this.speed);
    }

    public printIsMoving() {
        console.log(this.isMoving ? 'The car is moving' : 'The car is not moving');
    }
}

const car1 = new Car(24.56, true);
car1.accelerate(45.47);
car1.printSpeed();
car1.printIsMoving();
car1.stop();
car1.printIsMoving();

const car2 = new Car(0, false);
car2.accelerate(120.23);
car2.printSpeed();
car2.printIsMoving();
car2.stop();
car2.printIsMoving();