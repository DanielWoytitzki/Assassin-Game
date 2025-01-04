class BossHealthBar {
    constructor(boss) {
        this.boss = boss;
        this.width = 150;
        this.height = 15;
        this.offsetX = boss.width / 2 - this.width / 2;
        this.offsetY = 50;
    }

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