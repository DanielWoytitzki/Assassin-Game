class MovableObject extends DrawableObject {
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    hitboxWidth = this.width * 1;  // Hitbox ist 70% der Bildbreite
    hitboxHeight = this.height * 1; // Hitbox ist 80% der Bildhöhe

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
    
        // Spezielle Offsets nur für den Charakter
        if (this instanceof Character) {
            offsetX += this.hitboxOffsetX;
            offsetY += this.hitboxOffsetY;
        }
    
        // Berechne die Kollision unter Berücksichtigung der Hitbox und der Offsets
        return this.x + offsetX + this.hitboxWidth > mo.x + moOffsetX &&
            this.y + offsetY + this.hitboxHeight > mo.y + moOffsetY &&
            this.x + offsetX < mo.x + moOffsetX + mo.hitboxWidth &&
            this.y + offsetY < mo.y + moOffsetY + mo.hitboxHeight;
    }

    hit() {
        const hurtSound = new Audio('audio/character-damage.mp3');  // Erstelle das Audio-Objekt für den Charakterschaden
    
        this.energy -= 5;  // Verringere die Energie des Charakters um 5
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            hurtSound.play();  // Spiele den Schadensound ab, wenn der Charakter getroffen wird
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
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