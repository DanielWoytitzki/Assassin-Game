/**
 * Manages and draws a health bar for a boss enemy.
 */
class BossHealthBar {

    /**
     * Creates a new BossHealthBar instance for the specified boss.
     * 
     * @param {Object} boss - The boss object for which the health bar will be drawn.
     *   The boss object should have the following properties:
     *   - {number} x: The x-coordinate of the boss on the canvas.
     *   - {number} y: The y-coordinate of the boss on the canvas.
     *   - {number} width: The width of the boss in pixels.
     *   - {number} height: The height of the boss in pixels.
     *   - {number} health: The current health of the boss.
     *   - {number} maxHealth: The maximum health of the boss.
     */
    constructor(boss) {
        this.boss = boss;
        this.width = 150;
        this.height = 15;
        this.offsetX = boss.width / 2 - this.width / 2;
        this.offsetY = 50;
    }

    /**
     * Draws the health bar onto the specified canvas context.
     * The bar is rendered in two colors:
     * - Dark red for the background (total possible health).
     * - Lime green for the boss's current health.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.fillStyle = 'darkred';
        ctx.fillRect(this.boss.x + this.offsetX, this.boss.y + this.offsetY, this.width, this.height);
        ctx.fillStyle = 'limegreen';
        let currentWidth = this.width * (this.boss.health / this.boss.maxHealth);
        ctx.fillRect(this.boss.x + this.offsetX, this.boss.y + this.offsetY, currentWidth, this.height);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.boss.x + this.offsetX, this.boss.y + this.offsetY, this.width, this.height);
    }
}