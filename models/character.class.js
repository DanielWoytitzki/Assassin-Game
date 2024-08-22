class Character extends MovableObject {

    speed = 2;

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

    constructor() {
        super().loadImage('img/character-rogue/rogue.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 1000 / 10);
    }
}