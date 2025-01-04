class MovableObject extends DrawableObject {
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    hitboxWidth = this.width * 1;
    hitboxHeight = this.height * 1;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 275;
    }

    isColliding(mo) {
        let offsetX = (this.width - this.hitboxWidth) / 2;
        let offsetY = (this.height - this.hitboxHeight) / 2;
        let moOffsetX = (mo.width - mo.hitboxWidth) / 2;
        let moOffsetY = (mo.height - mo.hitboxHeight) / 2;
        if (this instanceof Character) {
            offsetX += this.hitboxOffsetX;
            offsetY += this.hitboxOffsetY;
        }
        return this.x + offsetX + this.hitboxWidth > mo.x + moOffsetX &&
            this.y + offsetY + this.hitboxHeight > mo.y + moOffsetY &&
            this.x + offsetX < mo.x + moOffsetX + mo.hitboxWidth &&
            this.y + offsetY < mo.y + moOffsetY + mo.hitboxHeight;
    }

    hit() {
        const hurtSound = new Audio('audio/character-damage.mp3');
        const currentTime = new Date().getTime();
        if (currentTime - this.lastHit > 1000) {
            this.energy -= 20;
            this.lastHit = currentTime;
            hurtSound.play();
        }
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        const jumpSound = new Audio('audio/jump.mp3');
        this.speedY = 30;
        jumpSound.play();
    }
}