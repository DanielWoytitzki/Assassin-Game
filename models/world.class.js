class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];
    collectables = [];  // Sammlung aller einsammelbaren Objekte
    canThrow = true;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollectableCollection();  // Prüfe, ob einsammelbare Objekte eingesammelt werden
            this.checkThrowObjects();
        }, 1000 / 5);
    }

    checkCollectableCollection() {
        this.level.collectables.forEach((collectable, collectableIndex) => {
            if (this.character.isColliding(collectable)) {
                console.log(`${collectable.type} eingesammelt!`);
                this.level.collectables.splice(collectableIndex, 1);  // Entferne das Objekt, nachdem es eingesammelt wurde
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.collectables);  // Sammelbare Objekte aus dem Level hinzufügen

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    checkThrowObjects() {
        if (this.keyboard.RSHIFT && this.canThrow) {
            let knife = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(knife);
            this.canThrow = false;  // Verhindert, dass das Messer kontinuierlich geworfen wird
        }
    
        // Setze canThrow auf true zurück, wenn die Taste losgelassen wird
        if (!this.keyboard.RSHIFT) {
            this.canThrow = true;
        }
    }

    checkCollisions() {
        // Prüfe Kollisionen zwischen dem Charakter und Gegnern
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();  // Der Charakter nimmt Schaden
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    
        // Prüfe Kollisionen zwischen geworfenen Objekten (Messer) und Gegnern
        this.throwableObjects.forEach((throwableObject, throwableIndex) => {
            for (let enemyIndex = 0; enemyIndex < this.level.enemies.length; enemyIndex++) {
                let enemy = this.level.enemies[enemyIndex];
                if (throwableObject.isColliding(enemy)) {
                    this.handleEnemyDeath(enemy, enemyIndex);  // Feind stirbt bei Treffer
                    this.throwableObjects.splice(throwableIndex, 1);  // Messer verschwindet nach dem Treffer
                    console.log('Gegner von Messer getroffen!');
    
                    // Beende die Schleife, sobald ein Gegner getroffen wurde
                    return;
                }
            }
        });
    }

    // Diese Methode gehört ebenfalls zur World-Klasse
    handleEnemyDeath(enemy, enemyIndex) {
        enemy.playDeathAnimation();  // Spiele die Sterbeanimation des Gegners ab
        setTimeout(() => {
            this.level.enemies.splice(enemyIndex, 1);  // Entferne den Gegner nach der Animation
        }, 2000);  // Animation dauert 500ms (kannst du anpassen)
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width / 2, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}