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
    bossMusic = new Audio('audio/endboss-music.mp3');
    bossBombs = [];
    bossReached = false; // Neue Variable, um zu verfolgen, ob der Boss erreicht wurde


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

        // Schleifen-Eigenschaften für Musik setzen
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.5;

        this.bossMusic.loop = true;
        this.bossMusic.volume = 0.7;

        this.backgroundMusic.play();  // Musik abspielen

        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
            }
        });
    }

    run() {
        this.gameInterval = setInterval(() => {
            this.checkCollisions();
            this.checkCollectableCollection();  // Prüfe, ob einsammelbare Objekte eingesammelt werden
            this.checkThrowObjects();
            this.checkGameOver();
        }, 1000 / 5);
    }

    checkGameOver() {
        if (this.character.isDead()) {
            this.showGameOverScreen();
            this.stopGame();  // Pausiere das Spiel
        }
    }

    showGameOverScreen() {
        document.getElementById('gameOverScreen').style.display = 'flex';
    }

    stopGame() {
        clearInterval(this.gameInterval);
        this.backgroundMusic.pause();
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

        // Bomben updaten und zeichnen
        this.bossBombs.forEach(bomb => {
            bomb.update(); // Bewegt die Bombe
            this.addToMap(bomb); // Zeichnet die Bombe auf die Karte
        });

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
                    if (enemy instanceof Endboss) {
                        console.log('Endboss getroffen!');
                        enemy.takeDamage();
                    } else {
                        this.handleEnemyDeath(enemy, enemyIndex);
                    }
                    this.throwableObjects.splice(throwableIndex, 1); // Messer verschwindet nach dem Treffer
                    return;
                }
            }
        });

        // Prüfe Kollisionen zwischen der Bombe und dem Charakter
        this.bossBombs.forEach((bomb, index) => {
            if (this.character.isColliding(bomb)) {
                console.log('Charakter von Bombe getroffen!');
                this.character.hit(); // Der Charakter nimmt Schaden
                this.bossBombs.splice(index, 1); // Bombe entfernen
                // Treffer-Sound hinzufügen
                const hitSound = new Audio('audio/bomb-explosion.mp3'); // Pfad zu deinem Treffer-Sound
                hitSound.volume = 0.5;  // Optional: Passe die Lautstärke an
                hitSound.play();  // Spiele den Treffer-Sound ab
            }
        });
    }

    // Diese Methode gehört ebenfalls zur World-Klasse
    handleEnemyDeath(enemy, enemyIndex) {
        if (enemy.isDead) {
            return; // Wenn der Gegner schon tot ist, tu nichts.
        }

        enemy.isDead = true;  // Markiere den Gegner als "tot", um doppelte Treffer zu vermeiden.
        const deathSound = new Audio('audio/enemy-dead.mp3');  // Erstelle das Audio-Objekt für den Todessound
        deathSound.play();  // Spiele den Todessound ab

        enemy.playDeathAnimation();  // Spiele die Sterbeanimation des Gegners ab

        // Entferne den Gegner nach Ablauf der Sterbeanimation
        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            if (index > -1) {
                this.level.enemies.splice(index, 1);  // Entferne den Gegner aus dem Array
                console.log('Gegner aus Array entfernt');
            }
        }, 2000);  // Animation dauert 2 Sekunden (anpassbar)
    }

    handleBossDeath() {
        const deathSound = new Audio('audio/boss-dead.mp3');  // Optional: Erstelle das Audio-Objekt für den Todessound

        deathSound.play();  // Spiele den Todessound ab

        this.level.endboss.playDeathAnimation();  // Spiele die Sterbeanimation des Endbosses ab
        setTimeout(() => {
            // Entferne den Endboss nach der Animation
            this.level.endboss = null;  // Setze den Endboss auf null, um ihn zu "entfernen"
            console.log("Endboss entfernt, Level abgeschlossen!");
            // Hier könntest du auch den Level-Abschluss behandeln (z.B. Übergang zu einer End-Szene).
        }, 3000);  // Animation dauert 3 Sekunden (anpassbar)
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