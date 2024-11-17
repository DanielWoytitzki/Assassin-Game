class Bomb extends MovableObject {
    speedY = 0.1;  // Initialgeschwindigkeit der Bombe (kann angepasst werden)
    acceleration = 0.1;  // Beschleunigung durch Schwerkraft (kann angepasst werden)
    speedX = 1 + Math.random() * 7;  // Geschwindigkeit in horizontaler Richtung (kann angepasst werden)

    constructor(x, y) {
        super().loadImage('img/bomb/bomb.png');  // Pfad zu deiner Bomben-Grafik
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.hitboxWidth = this.width; // Hitbox-Größe der Bombe
        this.hitboxHeight = this.height; // Hitbox-Höhe der Bombe
    }

    update() {
        this.y += this.speedY;
        this.speedY += this.acceleration; // Beschleunigung nach unten (Schwerkraft)
        this.x -= this.speedX; // Bewegung nach links (um den Effekt des Werfens zu simulieren)
    }

    checkCollisionWithCharacter(character) {
        // Überprüfe, ob die Bombe mit dem Charakter kollidiert
        if (
            this.x < character.x + character.hitboxWidth &&
            this.x + this.hitboxWidth > character.x &&
            this.y < character.y + character.hitboxHeight &&
            this.y + this.hitboxHeight > character.y
        ) {
            character.hit(); // Der Charakter verliert Leben, wenn er getroffen wird
            console.log('Updating status bar to:', character.energy); character.world.statusBar.setPercentage(character.energy); // Aktualisiere die Statusbar entsprechend der Energie des Charakters
        }
    }
}