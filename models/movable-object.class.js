/**
 * Represents a movable object in the game world, extending {@link DrawableObject}.
 * It includes properties for physics-based movement, collision detection,
 * health management, and basic animations.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    hitboxWidth = this.width * 1;
    hitboxHeight = this.height * 1;
    hurt_sound = new Audio('audio/character-damage.mp3');
    jump_sound = new Audio('audio/jump.mp3');

    /**
     * Applies gravity to this object by updating its vertical position (`y`)
     * and `speedY` in regular intervals. If the object is above ground or
     * moving upward, it continues to fall or move in the vertical axis.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
    * Determines whether this object is positioned above a specific ground level.
    * 
    * @returns {boolean} True if the object's y-coordinate is less than 275, 
    * indicating it is above the ground; otherwise false.
    */
    isAboveGround() {
        return this.y < 275;
    }

    /**
     * Checks for a collision with another movable object. The method calculates
     * the effective hitbox of both objects, including any offsets.
     * 
     * @param {MovableObject} mo - Another {@link MovableObject} to check for collision.
     * @returns {boolean} True if this object collides with the specified object, false otherwise.
     */
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

    /**
    * Handles the event of this object being hit by reducing its energy.
    * It prevents multiple hits in a short time by checking the time elapsed 
    * since the last hit. Plays a hurt sound if successfully hit.
    */
    hit() {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastHit > 1000) {
            this.energy -= 20;
            this.lastHit = currentTime;
            this.hurt_sound.play();
        }
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    /**
     * Checks whether this object is currently in a "hurt" state,
     * determined by the time elapsed since its last hit.
     * 
     * @returns {boolean} True if the object was hit in the last 0.5 seconds, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
     * Checks whether this object's energy has reached zero, meaning it is "dead."
     * 
     * @returns {boolean} True if `energy` is 0, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays an animation from a list of image paths by cycling through
     * frames in `images` and updating the object's current image.
     * 
     * @param {string[]} images - An array of image file paths to cycle through.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right by adding `speed` to its x-coordinate.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by subtracting `speed` from its x-coordinate.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Initiates a jump by setting a positive vertical speed (`speedY`), causing the 
     * object to move upward. Plays a jump sound effect.
     */
    jump() {
        this.speedY = 30;
        this.jump_sound.play();
    }
}