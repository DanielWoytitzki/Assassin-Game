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
    
    constructor() {
        super().loadImage('img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_000.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 20);
    }
}