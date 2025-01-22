/**
 * Represents the game world, containing the character, level data, 
 * audio elements, and logic for rendering, collision detection,
 * item collection, and more.
 */
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
    gameover_sound = new Audio('audio/game-over.mp3');
    throw_sound = new Audio('audio/knife-throw.mp3');
    bomb_hit_sound = new Audio('audio/bomb-explosion.mp3');
    enemy_death_sound = new Audio('audio/enemy-dead.mp3');
    bossBombs = [];
    bossReached = false;

    /**
     * Creates a new World instance, initializes audio settings,
     * starts rendering loops, and sets up input handling.
     *
     * @param {HTMLCanvasElement} canvas - The canvas on which the game is rendered.
     * @param {Keyboard} keyboard - The keyboard handler for user input.
     */
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

    /**
     * Assigns the current World instance to the character and, if present,
     * to any Endboss in the level, allowing them access to world-related properties.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
            }
        });
    }

    /**
     * Sets up a recurring interval to check collisions, collectables,
     * throwing logic, and game-over conditions at a fixed rate.
     */
    run() {
        this.gameInterval = setInterval(() => {
            this.checkCollisions();
            this.checkCollectableCollection();
            this.checkThrowObjects();
            this.checkGameOver();
            this.checkBombCollisions();
        }, 1000 / 5);
    }

    /**
     * Checks if the character is dead and, if so, displays the game-over screen
     * and stops the game logic.
     */
    checkGameOver() {
        if (this.character.isDead()) {
            this.showGameOverScreen();
            this.stopGame();
        }
    }

    /**
     * Displays the game-over screen overlay and plays a game-over sound.
     */
    showGameOverScreen() {
        document.getElementById('gameOverScreen').style.display = 'flex';
        this.gameover_sound.play();
    }

    /**
     * Stops the recurring game logic interval and pauses the background music.
     */
    stopGame() {
        clearInterval(this.gameInterval);
        this.backgroundMusic.pause();
    }

    /**
     * Checks for collisions between the character and collectable objects.
     * On collision:
     *  - Increments collectedCoins or availableKnives based on collectable type.
     *  - Plays a collect sound.
     *  - Removes the collectable from the level.
     */
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

    /**
     * Clears the canvas, repositions the camera, draws all game elements,
     * and sets up a recursive requestAnimationFrame call for continuous rendering.
     */
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

    /**
    * Draws the current count of collected coins and available knives on the UI,
    * including the icons.
    */
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

    /**
     * Checks if the player is attempting to throw a knife and if enough
     * knives are available. If so, a new ThrowableObject is created 
     * and added to the game world.
     */
    checkThrowObjects() {
        if (this.keyboard.RSHIFT && this.canThrow && this.availableKnives > 0) {
            let knife = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(knife);
            this.throw_sound.play();
            this.canThrow = false;
            this.availableKnives--;
        }
        if (!this.keyboard.RSHIFT) {
            this.canThrow = true;
        }
    }

    /**
     * Checks various collisions:
     *  - Character vs. enemies (damages character if collided).
     *  - Throwable objects vs. enemies (damages or kills enemy).
     *  - Character vs. boss bombs (damages character if collided).
     */
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
                this.bomb_hit_sound.volume = 0.5;
                this.bomb_hit_sound.play();
            }
        });
    }

    /**
     * Checks bomb collisions specifically with the character by delegating
     * collision checks to each bomb object.
     */
    checkBombCollisions() {
        this.bossBombs.forEach((bomb) => {
            bomb.checkCollisionWithCharacter(this.character);
        });
    }

    /**
     * Handles the death sequence for a generic enemy (non-boss). Sets the
     * enemy's isDead flag, plays a death sound, starts the death animation,
     * and removes it from the world after a short delay.
     *
     * @param {Enemy} enemy - The enemy being killed.
     * @param {number} enemyIndex - The index of the enemy in the enemies array.
     */
    handleEnemyDeath(enemy, enemyIndex) {
        if (enemy.isDead) {
            return;
        }
        enemy.isDead = true;
        this.enemy_death_sound.play();
        enemy.playDeathAnimation();
        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            if (index > -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 2000);
    }

    /**
     * Handles the death of the end boss by playing a death sound,
     * starting the boss's death animation, and removing the boss 
     * from the level after a delay.
     */
    handleBossDeath() {
        this.enemy_death_sound.play();
        this.level.endboss.playDeathAnimation();
        setTimeout(() => {
            this.level.endboss = null;
        }, 3000);
    }

    /**
     * Renders an array of objects on the canvas.
     * @param {DrawableObject[]} objects - An array of drawable objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Draws a single object on the canvas, flipping the image if needed (i.e., if `otherDirection` is true).
     * @param {DrawableObject} mo - A drawable object to render.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the drawing context horizontally for an object's image, used when `otherDirection` is true.
     * @param {MovableObject} mo - The object whose image will be flipped.
     * @private
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width / 2, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the object's x-position and the drawing context after flipping.
     * @param {MovableObject} mo - The object whose flipped image is being restored.
     * @private
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}