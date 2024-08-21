class Cloud extends MovableObject {
    y = 10;
    height = 300;
    width = 500;

    constructor() {
        super().loadImage('img/background/PNG/Cartoon_Forest_BG_01/Layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}