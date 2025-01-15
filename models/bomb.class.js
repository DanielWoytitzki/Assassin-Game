/**
 * Represents a bomb in the game that extends the functionality of a MovableObject.
 * Once thrown, it moves across the screen due to its horizontal (speedX) and
 * vertical (speedY + acceleration) movements.
 * @extends MovableObject
 */
class Bomb extends MovableObject {
    speedY = 0.1;
    acceleration = 0.1;
    speedX = 1 + Math.random() * 7;

    /**
     * Creates an instance of a Bomb.
     * 
     * @param {number} x - The initial x-coordinate position of the bomb.
     * @param {number} y - The initial y-coordinate position of the bomb.
     */
    constructor(x, y) {
        super().loadImage('img/bomb/bomb.png');
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.hitboxWidth = this.width;
        this.hitboxHeight = this.height;
    }

    /**
     * Updates the bomb's position based on its speed and acceleration.
     * It moves downward (y increases) and accelerates, while also moving
     * horizontally (x decreases) according to speedX.
     */
    update() {
        this.y += this.speedY;
        this.speedY += this.acceleration;
        this.x -= this.speedX;
    }

    /**
     * Checks for a collision with the given character. If a collision is detected,
     * the character takes damage (via character.hit()) and the status bar is updated.
     * 
     * @param {Character} character - The character object to check collision against.
     */
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