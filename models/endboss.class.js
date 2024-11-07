class Endboss extends MovableObject {
    height = 450;
    width = 450;
    y = 100;
    health = 4;
    maxHealth = 4;
    healthBar;
    isHurt = false;
    isDead = false;

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

    hurtSound = new Audio('audio/hurt-sound-endboss.mp3');
    deathSound = new Audio('audio/enemy-dead.mp3'); // Pfad zum Sterbe-Sound


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEATH);
        this.x = 2400;

        this.healthBar = new BossHealthBar(this); // Initialisiere die HealthBar

        this.animate();
        this.startThrowingBombs(); // Hier wird das Bombenwerfen gestartet
    }

    throwBomb() {
        if (this.world) {
            console.log('Endboss versucht, eine Bombe zu werfen!');
            let bombX = this.x + 100;  // Position links vom Boss
            let bombY = this.y + this.height / 10;

            let bomb = new Bomb(bombX, bombY);
            if (bomb) {
                this.world.bossBombs.push(bomb);  // Füge die Bombe zur bossBombs-Sammlung hinzu
                console.log('Bombe erfolgreich hinzugefügt:', bomb);
            } else {
                console.log('Fehler: Bombe konnte nicht erstellt werden.');
            }
        } else {
            console.log('Fehler: Endboss hat keine Referenz zur Welt.');
        }

        // Wurfsound hinzufügen
        const throwSound = new Audio('audio/throw-bomb.mp3'); // Pfad zu deinem Wurfsound
        throwSound.play();  // Spiele den Wurfsound ab
    }

    startThrowingBombs() {
        console.log('Start Throwing Bombs wird aufgerufen');
        setInterval(() => {
            this.throwBomb();
        }, 5000);  // Wirft alle 3 Sekunden eine Bombe
    }

    draw(ctx) {
        super.draw(ctx); // Zeichnet den Boss selbst
        this.healthBar.draw(ctx); // Zeichnet die HealthBar über dem Boss
    }

    takeDamage() {
        if (this.health > 0 && !this.isDead) {
            this.health--;
            console.log(`Endboss getroffen! Lebenspunkte: ${this.health}`);
            this.playHurtAnimation();
        }
        if (this.health <= 0 && !this.isDead) {
            this.playDeathAnimation();
        }
    }

    animate() {
        setInterval(() => {
            if (this.health > 0 && !this.isDead) {
                // Spiele nur dann die normale Animation ab, wenn der Boss nicht verletzt oder sterbend ist
                if (!this.isHurt) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 1000 / 20);

        setInterval(() => {
            if (this.world && this.x - this.world.character.x < 500) {  // Falls der Charakter in der Nähe ist (500 px)
                this.startThrowingBombs();
            }
        }, 1000);
    }

    playHurtAnimation() {
        this.isHurt = true;  // Setze Zustand auf "verletzt"
        this.hurtSound.play();
        this.playAnimation(this.IMAGES_HURT);

        // Nach kurzer Zeit zurück zur normalen Animation wechseln
        setTimeout(() => {
            this.isHurt = false;  // Zustand wieder auf normal setzen
        }, 1000); // 1000 ms für die Treffer-Animation
    }

    playDeathAnimation() {
        console.log("Endboss ist besiegt!");
        this.isDead = true; // Setze Zustand auf "sterbend"
        this.deathSound.play();  // Spiele den Sterbe-Sound ab

        let animationIndex = 0;
        const deathAnimationInterval = setInterval(() => {
            if (animationIndex < this.IMAGES_DEATH.length) {
                this.img = this.imageCache[this.IMAGES_DEATH[animationIndex]];
                animationIndex++;
            } else {
                clearInterval(deathAnimationInterval);
                // Nach der Animation können wir den Endboss als "tot" markieren oder entfernen
                this.dead = true;
                console.log("Endboss ist vollständig besiegt!");
                // Hier könnte man Logik einfügen, um den Endboss aus dem Level zu entfernen
            }
        }, 1000 / 20); // Zeitintervall zwischen den Bildern der Sterbeanimation
    }
}