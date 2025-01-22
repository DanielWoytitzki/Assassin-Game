/**
 * Represents a collectable object in the game, such as a coin or a knife.
 * Extends the functionality of a DrawableObject.
 * @extends DrawableObject
 */
class CollectableObject extends DrawableObject {

    /**
     * Creates a new CollectableObject instance.
     *
     * @param {number} x - The x-coordinate of the collectable object.
     * @param {number} y - The y-coordinate of the collectable object.
     * @param {string} type - The type of the collectable object (e.g., 'coin' or 'knife').
     * @param {number} [width=50] - The width of the object in pixels (default is 50).
     * @param {number} [height=50] - The height of the object in pixels (default is 50).
     */
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
            this.collect_sound = new Audio('audio/collect-coin.mp3');
        }
        if (this.type === 'knife') {
            this.collect_sound = new Audio('audio/collect-knife.mp3');
        }
    }

    /**
     * Plays the collect sound if available.  
     * Used when the player picks up this object.
     */
    playCollectSound() {
        if (this.collect_sound) {
            this.collect_sound.play();
        }
    }
}
