class BossHealthBar {
    constructor(boss) {
        this.boss = boss;
        this.width = 100;  // Breite des Lebensbalkens
        this.height = 10;  // Höhe des Lebensbalkens
        this.offsetX = boss.width / 2 - this.width / 2;  // Zentriere den Balken über dem Boss
        this.offsetY = -20;  // Abstand über dem Kopf des Bosses
    }

    draw(ctx) {
        // Hintergrund des Balkens (verlorene HP)
        ctx.fillStyle = 'red';
        ctx.fillRect(this.boss.x + this.offsetX, this.boss.y + this.offsetY, this.width, this.height);

        // Vordere HP-Anzeige (verbleibende HP)
        ctx.fillStyle = 'green';
        let currentWidth = this.width * (this.boss.health / this.boss.maxHealth);
        ctx.fillRect(this.boss.x + this.offsetX, this.boss.y + this.offsetY, currentWidth, this.height);
    }
}