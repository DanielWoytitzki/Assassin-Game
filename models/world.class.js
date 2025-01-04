class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];
    collectables = [];
    canThrow = true;
    collectedCoins = 0;
    availableKnives = 0;
    backgroundMusic = new Audio('audio/background.mp3');
    bossMusic = new Audio('audio/endboss-music.mp3');
    bossBombs = [];
    bossReached = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.coinIcon = new Image();
        this.coinIcon.src = 'img/8_coin/coin_1.png';
        this.knifeIcon = new Image();
        this.knifeIcon.src = 'img/knife/PNG/knife.png';
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.5;
        this.bossMusic.loop = true;
        this.bossMusic.volume = 0.7;
        this.backgroundMusic.play();
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
            this.checkCollectableCollection();
            this.checkThrowObjects();
            this.checkGameOver();
            this.checkBombCollisions();
        }, 1000 / 5);
    }

    checkGameOver() {
        if (this.character.isDead()) {
            this.showGameOverScreen();
            this.stopGame();
        }
    }

    showGameOverScreen() {
        document.getElementById('gameOverScreen').style.display = 'flex';
        const gameOverSound = new Audio('audio/game-over.mp3');
        gameOverSound.play();
    }

    stopGame() {
        clearInterval(this.gameInterval);
        this.backgroundMusic.pause();
    }

    checkCollectableCollection() {
        this.level.collectables.forEach((collectable, collectableIndex) => {
            if (this.character.isColliding(collectable)) {
                if (collectable.type === 'coin') {
                    this.collectedCoins++;
                    collectable.playCollectSound();
                }
                if (collectable.type === 'knife') {
                    this.availableKnives++;
                    collectable.playCollectSound();
                }
                this.level.collectables.splice(collectableIndex, 1);
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
        this.addObjectsToMap(this.level.collectables);
        this.bossBombs.forEach(bomb => {
            bomb.update();
            this.addToMap(bomb);
        });
        this.ctx.translate(-this.camera_x, 0);
        this.drawCollectableCount();
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    drawCollectableCount() {
        if (this.coinIcon.complete && this.knifeIcon.complete) {
            this.ctx.drawImage(this.coinIcon, -17, 20, 120, 120);
            this.ctx.drawImage(this.knifeIcon, 20, 105, 40, 40);
            this.ctx.font = "32px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(this.collectedCoins, 70, 90);
            this.ctx.fillText(this.availableKnives, 70, 135);
        }
    }

    checkThrowObjects() {
        const throwSound = new Audio('audio/knife-throw.mp3');
        if (this.keyboard.RSHIFT && this.canThrow && this.availableKnives > 0) {
            let knife = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(knife);
            throwSound.play();
            this.canThrow = false;
            this.availableKnives--;
        }
        if (!this.keyboard.RSHIFT) {
            this.canThrow = true;
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
        this.throwableObjects.forEach((throwableObject, throwableIndex) => {
            for (let enemyIndex = 0; enemyIndex < this.level.enemies.length; enemyIndex++) {
                let enemy = this.level.enemies[enemyIndex];
                if (throwableObject.isColliding(enemy)) {
                    if (enemy instanceof Endboss) {
                        enemy.takeDamage();
                    } else {
                        this.handleEnemyDeath(enemy, enemyIndex);
                    }
                    this.throwableObjects.splice(throwableIndex, 1);
                    return;
                }
            }
        });
        this.bossBombs.forEach((bomb, index) => {
            if (this.character.isColliding(bomb)) {
                this.character.hit();
                this.bossBombs.splice(index, 1);
                const hitSound = new Audio('audio/bomb-explosion.mp3');
                hitSound.volume = 0.5;
                hitSound.play();
            }
        });
    }

    checkBombCollisions() {
        this.bossBombs.forEach((bomb) => {
            bomb.checkCollisionWithCharacter(this.character);
        });
    }

    handleEnemyDeath(enemy, enemyIndex) {
        if (enemy.isDead) {
            return;
        }
        enemy.isDead = true;
        const deathSound = new Audio('audio/enemy-dead.mp3');
        deathSound.play();
        enemy.playDeathAnimation();
        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            if (index > -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 2000);
    }

    handleBossDeath() {
        const deathSound = new Audio('audio/boss-dead.mp3');
        deathSound.play();
        this.level.endboss.playDeathAnimation();
        setTimeout(() => {
            this.level.endboss = null;
        }, 3000);
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