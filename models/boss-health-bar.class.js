class BossHealthBar {
    constructor(boss) {
        this.boss = boss;
        this.width = 150;  // Breite des Lebensbalkens
        this.height = 15;  // Höhe des Lebensbalkens
        this.offsetX = boss.width / 2 - this.width / 2;  // Zentriere den Balken über dem Boss
        this.offsetY = 50;  // Abstand über dem Kopf des Bosses
    }

    draw(ctx) {
        // Hintergrund des Balkens (verlorene HP)
        ctx.fillStyle = 'darkred';
        ctx.fillRect(this.boss.x + this.offsetX, this.boss.y + this.offsetY, this.width, this.height);

        // Vordere HP-Anzeige (verbleibende HP)
        ctx.fillStyle = 'limegreen';
        let currentWidth = this.width * (this.boss.health / this.boss.maxHealth);
        ctx.fillRect(this.boss.x + this.offsetX, this.boss.y + this.offsetY, currentWidth, this.height);

        // Rahmen um die Healthbar zeichnen
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.boss.x + this.offsetX, this.boss.y + this.offsetY, this.width, this.height);
    }
}