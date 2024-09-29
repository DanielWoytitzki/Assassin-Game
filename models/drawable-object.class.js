class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 175;
    height = 200;
    width = 200;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Enemy || this instanceof CollectableObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
    
            // Unterschiedliche Farben für verschiedene Objekte
            if (this instanceof Character) {
                ctx.strokeStyle = 'blue';
            } else if (this instanceof Enemy) {
                ctx.strokeStyle = 'green';
            } else if (this instanceof CollectableObject) {
                ctx.strokeStyle = 'red';  // Rote Rahmen für Collectables
            }
    
            let offsetX = (this.width - this.hitboxWidth) / 2;
            let offsetY = (this.height - this.hitboxHeight) / 2;
    
            // Spezielle Offsets nur für den Charakter
            if (this instanceof Character) {
                offsetX += this.hitboxOffsetX;
                offsetY += this.hitboxOffsetY;
            }
    
            ctx.rect(this.x + offsetX, this.y + offsetY, this.hitboxWidth, this.hitboxHeight);
            ctx.stroke();
        }
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}