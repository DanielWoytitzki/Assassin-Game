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
    collectedCoins = 0;  // Anfangswert für Münzen
    availableKnives = 5;  // Anfangswert für Messer
    backgroundMusic = new Audio('audio/background.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        // Münz-Icon laden
        this.coinIcon = new Image();
        this.coinIcon.src = 'img/8_coin/coin_1.png';  // Pfad zum Münz-Icon-Bild

        // Messer-Icon laden
        this.knifeIcon = new Image();
        this.knifeIcon.src = 'img/knife/PNG/knife.png';  // Pfad zum Messer-Icon-Bild

        this.backgroundMusic.loop = true;  // Schleife aktivieren, damit die Musik wiederholt wird
        this.backgroundMusic.volume = 0.5;  // Lautstärke auf 50% setzen (anpassbar)
        this.backgroundMusic.play();  // Musik abspielen

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
        console.log("checkCollectableCollection wird aufgerufen");  // Debug-Ausgabe
        this.level.collectables.forEach((collectable, collectableIndex) => {
            if (this.character.isColliding(collectable)) {
                console.log(`${collectable.type} eingesammelt!`);

                // Spiele den Sound ab, wenn das Collectable ein Sound-Feature hat
                if (collectable.type === 'coin') {
                    this.collectedCoins++;  // Münzenanzahl erhöhen
                    collectable.playCollectSound();
                }

                if (collectable.type === 'knife') {
                    this.availableKnives++;  // Messeranzahl erhöhen
                    collectable.playCollectSound();
                }

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

        this.drawCollectableCount();

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    drawCollectableCount() {
        // Prüfen, ob die Bilder geladen sind, bevor wir sie zeichnen
        if (this.coinIcon.complete && this.knifeIcon.complete) {
            // Münz-Icon zeichnen
            this.ctx.drawImage(this.coinIcon, -17, 20, 120, 120);  // Münz-Icon (X: 20, Y: 50, Größe: 40x40)
    
            // Messer-Icon zeichnen
            this.ctx.drawImage(this.knifeIcon, 20, 105, 40, 40);  // Messer-Icon (X: 20, Y: 100, Größe: 40x40)
    
            // Anzahl der Münzen neben dem Münz-Icon zeichnen
            this.ctx.font = "32px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(this.collectedCoins, 70, 90);  // Zahl für Münzen (X: 70, Y: 80)
    
            // Anzahl der Messer neben dem Messer-Icon zeichnen
            this.ctx.fillText(this.availableKnives, 70, 135);  // Zahl für Messer (X: 70, Y: 130)
        }
    }

    checkThrowObjects() {
        const throwSound = new Audio('audio/knife-throw.mp3');  // Erstelle das Audio-Objekt für den Messersound
       
        if (this.keyboard.RSHIFT && this.canThrow && this.availableKnives > 0) {
            console.log("Bedingung erfüllt: Messer kann geworfen werden");
            
            // Messer werfen
            let knife = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(knife);
    
            // Sound abspielen
            throwSound.play();
    
            // Messeranzahl und CanThrow aktualisieren
            this.canThrow = false;  // Verhindert kontinuierliches Werfen
            this.availableKnives--;  // Zähle ein Messer vom Count herunter
            console.log(`Messer geworfen! Verfügbare Messer nach dem Wurf: ${this.availableKnives}`);
        }
    
        if (!this.keyboard.RSHIFT) {
            this.canThrow = true;  // Setze die Wurf-Freigabe zurück, wenn die Taste losgelassen wird
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
        const deathSound = new Audio('audio/enemy-dead.mp3');  // Erstelle das Audio-Objekt für den Todessound
    
        deathSound.play();  // Spiele den Todessound ab
    
        enemy.playDeathAnimation();  // Spiele die Sterbeanimation des Gegners ab
        setTimeout(() => {
            this.level.enemies.splice(enemyIndex, 1);  // Entferne den Gegner nach der Animation
        }, 2000);  // Animation dauert 2 Sekunden (anpassbar)
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