class CollectableObject extends DrawableObject {
    constructor(x, y, type, width = 50, height = 50) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        if (this.type === 'coin') {
            this.hitboxWidth = width * 0.2;
            this.hitboxHeight = height * 0.2;
        } else if (this.type === 'knife') {
            this.hitboxWidth = width * 0.8;
            this.hitboxHeight = height * 0.8;
        } else {
            this.hitboxWidth = width;
            this.hitboxHeight = height;
        }
        if (this.type === 'coin') {
            this.loadImage('img/8_coin/coin_1.png');
        } else if (this.type === 'knife') {
            this.loadImage('img/knife/PNG/knife.png');
        }
        if (this.type === 'coin') {
            this.collectSound = new Audio('audio/collect-coin.mp3');
        }
        if (this.type === 'knife') {
            this.collectSound = new Audio('audio/collect-knife.mp3');
        }
    }

    playCollectSound() {
        if (this.collectSound) {
            this.collectSound.play();
        }
    }
}
