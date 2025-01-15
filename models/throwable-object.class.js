/**
 * Represents an object that can be thrown, moving horizontally through the game world.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {

    /**
     * Creates a new ThrowableObject instance, setting its position and dimensions.
     * Also loads the image to be used when rendered on the canvas.
     *
     * @param {number} x - The initial x-coordinate of the thrown object.
     * @param {number} y - The initial y-coordinate of the thrown object.
     */
    constructor(x, y) {
        super().loadImage('img/knife/PNG/knife-removebg-preview.png');
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.throw();
    }

    /**
     * Initiates the throwing movement by repeatedly increasing the x-coordinate,
     * giving the object a horizontal trajectory.
     */
    throw() {
        setInterval(() => {
            this.x += 8;
        }, 1000 / 60);
    }
}