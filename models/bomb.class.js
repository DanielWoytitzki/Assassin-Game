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
    }

    update() {
        this.y += this.speedY;
        this.speedY += this.acceleration; // Beschleunigung nach unten (Schwerkraft)
        
        // Bewegung nach rechts (optional, damit es aussieht, als ob die Bombe geworfen wird)
        this.x -= this.speedX;
    }
}