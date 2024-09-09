class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super().loadImage('img/knife/PNG/knife-removebg-preview.png');
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.throw();
    }

    throw() {
        setInterval(() => {
            this.x += 8;
        }, 1000 / 60);
    }
}