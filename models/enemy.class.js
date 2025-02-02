/**
 * Represents a basic enemy character in the game, inheriting from MovableObject.
 * This enemy walks from right to left and can be killed by triggering a death animation.
 * @extends MovableObject
 */
class Enemy extends MovableObject {
    y = 330;
    height = 150;
    width = 150;
    IMAGES_WALKING = [
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_000.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_001.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_002.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_003.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_004.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_005.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_006.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_007.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_008.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_009.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_010.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_011.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_012.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_013.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_014.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_015.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_016.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_017.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_018.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_019.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_020.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_021.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_022.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_023.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_024.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_025.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_026.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_027.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_028.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_029.png'
    ];
    IMAGES_DEAD = [
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_000.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_001.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_002.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_003.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_004.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_005.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_006.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_007.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_008.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_009.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_010.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_011.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_012.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_013.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_014.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_015.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_016.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_017.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_018.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_019.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_020.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_021.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_022.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_023.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_024.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_025.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_026.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_027.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_028.png',
        'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_029.png'
    ];
    isDead = false;

    /**
     * Creates a new Enemy instance, sets up its hitbox, loads images,
     * positions it randomly on the x-axis, and starts its animation loop.
     */
    constructor() {
        super();
        this.hitboxWidth = this.width * 0.3;
        this.hitboxHeight = this.height * 0.55;
        this.loadImage('img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_000.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 2000;
        this.speed = 0.5 + Math.random() * 1.5;
        this.animate();
    }

    /**
     * Periodically moves the enemy to the left and plays its walking animation,
     * unless the enemy is flagged as dead.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 20);
    }

    /**
     * Plays the enemy's death animation, switching to each frame in IMAGES_DEAD
     * and then calls removeEnemy() once completed.
     */
    playDeathAnimation() {
        this.isDead = true;
        let animationIndex = 0;
        let deathAnimationInterval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_DEAD[animationIndex]];
            animationIndex++;
            if (animationIndex >= this.IMAGES_DEAD.length) {
                clearInterval(deathAnimationInterval);
                this.removeEnemy();
            }
        }, 1000 / 20);
    }

    /**
     * Removes this enemy from the global `world.level.enemies` array,
     * effectively deleting it from the game world.
     */
    removeEnemy() {
        let enemyIndex = world.level.enemies.indexOf(this);
        if (enemyIndex !== -1) {
            world.level.enemies.splice(enemyIndex, 1);
        }
    }
}