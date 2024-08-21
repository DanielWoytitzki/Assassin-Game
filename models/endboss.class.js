class Endboss extends MovableObject {
    height = 450;
    width = 450;
    y = 100;
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

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2400;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 20);
    }
}