class CollectableObject extends DrawableObject {
    constructor(x, y, type, width = 50, height = 50) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;  // Standardgröße, kann je nach Typ angepasst werden
        this.height = height;
        this.type = type;

        // Lade das entsprechende Bild abhängig vom Typ des einsammelbaren Objekts
        if (this.type === 'coin') {
            this.loadImage('img/8_coin/coin_1.png');  // Pfad zum Münzbild
        } else if (this.type === 'knife') {
            this.loadImage('img/knife/PNG/knife.png');  // Pfad zum Messerbild
        }
    }
}