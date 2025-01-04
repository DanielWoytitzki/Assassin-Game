class Bomb extends MovableObject {
    speedY = 0.1;
    acceleration = 0.1;
    speedX = 1 + Math.random() * 7;

    constructor(x, y) {
        super().loadImage('img/bomb/bomb.png');
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.hitboxWidth = this.width;
        this.hitboxHeight = this.height;
    }

    update() {
        this.y += this.speedY;
        this.speedY += this.acceleration;
        this.x -= this.speedX;
    }

    checkCollisionWithCharacter(character) {
        if (
            this.x < character.x + character.hitboxWidth &&
            this.x + this.hitboxWidth > character.x &&
            this.y < character.y + character.hitboxHeight &&
            this.y + this.hitboxHeight > character.y
        ) {
            character.hit();
            character.world.statusBar.setPercentage(character.energy);
        }
    }
}