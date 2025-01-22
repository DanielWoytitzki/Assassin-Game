/**
 * Represents the final boss in the game, extending the functionality of a movable object.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    height = 450;
    width = 450;
    y = 100;
    health = 4;
    maxHealth = 4;
    healthBar;
    isHurt = false;
    isDead = false;
    isBossMusicPlaying = false;
    IMAGES_WALKING = [
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_000.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_001.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_002.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_003.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_004.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_005.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_006.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_007.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_008.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_009.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_010.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_011.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_012.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_013.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_014.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_015.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_016.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_017.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_018.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_019.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_020.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_021.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_022.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_023.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_024.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_025.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_026.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_027.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_028.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_029.png'
    ];
    IMAGES_HURT = [
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Hurt/0_Warrior_Hurt_000.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Hurt/0_Warrior_Hurt_001.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Hurt/0_Warrior_Hurt_002.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Hurt/0_Warrior_Hurt_003.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Hurt/0_Warrior_Hurt_004.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Hurt/0_Warrior_Hurt_005.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Hurt/0_Warrior_Hurt_006.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Hurt/0_Warrior_Hurt_007.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Hurt/0_Warrior_Hurt_008.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Hurt/0_Warrior_Hurt_009.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Hurt/0_Warrior_Hurt_010.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Hurt/0_Warrior_Hurt_011.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Hurt/0_Warrior_Hurt_012.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Hurt/0_Warrior_Hurt_013.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Hurt/0_Warrior_Hurt_014.png'
    ];
    IMAGES_DEATH = [
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_000.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_001.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_002.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_003.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_004.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_005.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_006.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_007.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_008.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_009.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_010.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_011.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_012.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_013.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_014.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_015.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_016.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_017.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_018.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_019.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_020.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_021.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_022.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_023.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_024.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_025.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_026.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_027.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_028.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_029.png'
    ];
    hurt_sound = new Audio('audio/hurt-sound-endboss.mp3');
    death_sound = new Audio('audio/enemy-dead.mp3');
    throw_sound = new Audio('audio/throw-bomb.mp3');

/**
     * Creates an instance of the endboss, loads required images,
     * sets the starting position, and initializes the health bar.
     */
constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEATH);
    this.x = 2400;
    this.healthBar = new BossHealthBar(this);
    this.animate();
}

/**
 * Throws a bomb if the world is available, creating a new Bomb instance
 * and playing a throw sound effect.
 */
throwBomb() {
    if (this.world) {
        let bombX = this.x + 100;
        let bombY = this.y + this.height / 10;
        let bomb = new Bomb(bombX, bombY);
        if (bomb) {
            this.world.bossBombs.push(bomb);
        }
        this.throw_sound.play();
    }
}

/**
 * Animates the endboss in intervals, checking if it should throw bombs
 * or play boss music when the character is within a certain range.
 */
animate() {
    setInterval(() => {
        if (this.health > 0 && !this.isDead) {
            if (!this.isHurt) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (
                this.world &&
                Math.abs(this.x - this.world.character.x) < 500 &&
                !this.throwBombInterval
            ) {
                this.startThrowingBombs();
            }
            if (this.world && Math.abs(this.x - this.world.character.x) < 500) {
                if (!this.isBossMusicPlaying) {
                    this.startBossMusic();
                    this.isBossMusicPlaying = true;
                }
                this.world.bossReached = true;
            }
        }
    }, 1000 / 20);
}

/**
 * Pauses the background music and starts playing the boss music.
 */
startBossMusic() {
    this.world.backgroundMusic.pause();
    this.world.bossMusic.currentTime = 0;
    this.world.bossMusic.play();
}

/**
 * Initiates timed bomb throws while the endboss is alive.
 */
startThrowingBombs() {
    if (!this.throwBombInterval) {
        this.throwBombInterval = setInterval(() => {
            if (this.health > 0 && !this.isDead) {
                this.throwBomb();
            }
        }, 2000);
    }
}

/**
 * Draws the endboss and its health bar onto the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 */
draw(ctx) {
    super.draw(ctx);
    this.healthBar.draw(ctx);
}

/**
 * Decreases the endboss's health. Plays the hurt or death animation
 * depending on the current health.
 */
takeDamage() {
    if (this.health > 0 && !this.isDead) {
        this.health--;
        this.playHurtAnimation();
    }
    if (this.health <= 0 && !this.isDead) {
        this.playDeathAnimation();
    }
}

/**
 * Plays the hurt animation and temporarily sets the endboss
 * to the "hurt" state.
 */
playHurtAnimation() {
    this.isHurt = true;
    this.hurt_sound.play();
    this.playAnimation(this.IMAGES_HURT);
    setTimeout(() => {
        this.isHurt = false;
    }, 1000);
}

/**
 * Plays the death animation, pauses the boss music, and
 * displays the winning screen afterward.
 */
playDeathAnimation() {
    this.isDead = true;
    this.death_sound.play();
    let animationIndex = 0;
    const deathAnimationInterval = setInterval(() => {
        if (animationIndex < this.IMAGES_DEATH.length) {
            this.img = this.imageCache[this.IMAGES_DEATH[animationIndex]];
            animationIndex++;
        } else {
            clearInterval(deathAnimationInterval);
            this.dead = true;
            this.world.bossMusic.pause();
            showWinningScreen();
        }
    }, 1000 / 20);
}
}