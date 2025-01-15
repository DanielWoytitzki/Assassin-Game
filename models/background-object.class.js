/**
 * Represents a background object in the game, extending the functionality
 * of a MovableObject. These objects are typically used to display
 * static or scrolling backgrounds.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates a BackgroundObject instance and positions it in the scene.
     *
     * @param {string} imagePath - The path to the image that represents the background.
     * @param {number} x - The x-coordinate where the background object will be placed.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}