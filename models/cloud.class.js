/**
 * Represents a cloud in the game world that moves from right to left.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    y = 10;
    height = 300;
    width = 500;

    /**
     * Creates a new Cloud instance, loads the cloud image, positions it randomly on the x-axis,
     * and initializes its animation.
     */
    constructor() {
        super().loadImage('img/background/PNG/Cartoon_Forest_BG_01/Layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Animates the cloud by moving it to the left.
     * Clouds typically loop around or reappear from the right side,
     * depending on your game logic (not shown here).
     */
    animate() {
        this.moveLeft();
    }
}