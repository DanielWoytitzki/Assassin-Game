/**
 * Represents the main playable character in the game, extending a MovableObject
 * with additional properties and methods for movement, animation, and collision.
 * @extends MovableObject
 */
class Character extends MovableObject {
    speed = 3;
    y = -200;
    idleTimer = 0;
    IMAGES_IDLE = [
        'img/character-rogue/Idle/idle1.png',
        'img/character-rogue/Idle/idle2.png',
        'img/character-rogue/Idle/idle3.png',
        'img/character-rogue/Idle/idle4.png',
        'img/character-rogue/Idle/idle5.png',
        'img/character-rogue/Idle/idle6.png',
        'img/character-rogue/Idle/idle7.png',
        'img/character-rogue/Idle/idle8.png',
        'img/character-rogue/Idle/idle9.png',
        'img/character-rogue/Idle/idle10.png',
        'img/character-rogue/Idle/idle12.png',
        'img/character-rogue/Idle/idle13.png',
        'img/character-rogue/Idle/idle14.png',
        'img/character-rogue/Idle/idle15.png',
        'img/character-rogue/Idle/idle16.png',
        'img/character-rogue/Idle/idle17.png',
        'img/character-rogue/Idle/idle18.png'
    ];
    IMAGES_WALKING = [
        'img/character-rogue/Walk/walk1.png',
        'img/character-rogue/Walk/walk2.png',
        'img/character-rogue/Walk/walk3.png',
        'img/character-rogue/Walk/walk4.png',
        'img/character-rogue/Walk/walk5.png',
        'img/character-rogue/Walk/walk6.png'
    ];
    IMAGES_JUMPING = [
        'img/character-rogue/Jump/jump1.png',
        'img/character-rogue/Jump/jump2.png',
        'img/character-rogue/Jump/jump3.png',
        'img/character-rogue/Jump/jump4.png',
        'img/character-rogue/Jump/jump5.png',
        'img/character-rogue/Jump/jump6.png',
        'img/character-rogue/Jump/jump7.png'
    ];
    IMAGES_DEAD = [
        'img/character-rogue/Death/death1.png',
        'img/character-rogue/Death/death2.png',
        'img/character-rogue/Death/death3.png',
        'img/character-rogue/Death/death4.png',
        'img/character-rogue/Death/death5.png',
        'img/character-rogue/Death/death6.png',
        'img/character-rogue/Death/death7.png',
        'img/character-rogue/Death/death8.png',
        'img/character-rogue/Death/death9.png',
        'img/character-rogue/Death/death10.png'
    ];
    IMAGES_HURT = [
        'img/character-rogue/Hurt/hurt1.png',
        'img/character-rogue/Hurt/hurt2.png',
        'img/character-rogue/Hurt/hurt3.png',
        'img/character-rogue/Hurt/hurt4.png'
    ];
    world;
    walking_sound = new Audio('audio/walking.mp3');

    /**
     * Initializes a new Character instance by setting up hitbox properties,
     * loading images, applying gravity, and starting the animation loops.
     */
    constructor() {
        super();
        this.hitboxWidth = this.width * 0.3;
        this.hitboxHeight = this.height * 0.5;

        this.hitboxOffsetX = -30;
        this.hitboxOffsetY = 25;

        this.loadImage('img/character-rogue/rogue.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.applyGravity();
        this.animate();
    }

    /**
     * Starts two interval-based loops:
     * - One for moving the character (60 times per second).
     * - One for updating the character's animations (10 times per second).
     */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playAnimationsCharacter(), 1000 / 10);
    }

    /**
     * Handles horizontal movement, jumping, and camera positioning based on user input.
     * Pauses or plays walking sounds as needed, and resets idle timer when moving or jumping.
     */
    moveCharacter() {
        this.walking_sound.pause();
        if (this.world && this.world.keyboard) {
            if (this.canMoveRight())
                this.moveRight();
            if (this.canMoveLeft())
                this.moveLeft();
            if (this.canJump()) {
                this.jump();
                this.idleTimer = 0;
            }
            if (this.world) {
                this.world.camera_x = -this.x;
            }
        }
    }

    /**
     * Determines if the character is allowed to move to the right based on keyboard input
     * and the level boundary.
     * @returns {boolean} True if the character can move right, otherwise false.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Moves the character to the right, flips the direction if needed,
     * plays the walking sound, and resets the idle timer.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
        this.idleTimer = 0;
    }

    /**
     * Determines if the character is allowed to move to the left based on keyboard input
     * and the left boundary (x > 0).
     * @returns {boolean} True if the character can move left, otherwise false.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Moves the character to the left if the boss hasn't been reached (or if x > 2000),
     * flips the direction if needed, plays the walking sound, and resets the idle timer.
     */
    moveLeft() {
        if (!this.world.bossReached || this.x > 2000) {
            super.moveLeft();
            this.otherDirection = true;
            this.walking_sound.play();
            this.idleTimer = 0;
        }
    }

    /**
     * Determines if the character can jump based on keyboard input and whether
     * the character is currently above the ground.
     * @returns {boolean} True if the character can jump, otherwise false.
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Plays the appropriate character animations based on the character's state:
     * - Dead: plays death animation
     * - Hurt: plays hurt animation
     * - Above ground: plays jumping animation
     * - Moving (left/right): plays walking animation
     * - Idle: plays idle animation after a certain idle time (2 seconds)
     */
    playAnimationsCharacter() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.idleTimer = 0;
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.idleTimer = 0;
        } else if (this.world && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
            this.playAnimation(this.IMAGES_WALKING);
            this.idleTimer = 0;
        } else {
            this.idleTimer += 100;
            if (this.idleTimer > 0) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }
    }
}    