class CollectableObject extends DrawableObject {
    constructor(x, y, type, width = 50, height = 50) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;  // Standardgröße
        this.height = height;
        this.type = type;

        // Unterschiedliche Hitbox-Größen für Münzen und Messer festlegen
        if (this.type === 'coin') {
            this.hitboxWidth = width * 0.2;  // Beispiel: 60% der Bildbreite für Münzen
            this.hitboxHeight = height * 0.2;  // 60% der Bildhöhe
        } else if (this.type === 'knife') {
            this.hitboxWidth = width * 0.8;  // 90% der Bildbreite für Messer
            this.hitboxHeight = height * 0.8;  // 50% der Bildhöhe
        } else {
            this.hitboxWidth = width;  // Standard-Hitbox-Breite
            this.hitboxHeight = height;  // Standard-Hitbox-Höhe
        }

        // Lade das entsprechende Bild abhängig vom Typ des einsammelbaren Objekts
        if (this.type === 'coin') {
            this.loadImage('img/8_coin/coin_1.png');  // Pfad zum Münzbild
        } else if (this.type === 'knife') {
            this.loadImage('img/knife/PNG/knife.png');  // Pfad zum Messerbild
        }

        // Lade den Sound nur für Münzen
        if (this.type === 'coin') {
            this.collectSound = new Audio('audio/collect-coin.mp3');  // Füge den Pfad zur Münz-Sounddatei hinzu
        }

        // Sound Messer einsammeln
        if (this.type === 'knife') {
            this.collectSound = new Audio('audio/collect-knife.mp3');  // Füge den Pfad zur Münz-Sounddatei hinzu
        }
    }

    playCollectSound() {
        if (this.collectSound) {
            this.collectSound.play();
        }
    }
}
