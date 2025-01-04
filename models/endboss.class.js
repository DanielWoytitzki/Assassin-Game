class Endboss extends MovableObject {
    height = 450;
    width = 450;
    y = 100;
    health = 4;
    maxHealth = 4;
    healthBar;
    isHurt = false;
    isDead = false;
    isBossMusicPlaying = false; // Neue Variable, um den Zustand der Musik zu verfolgen

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
        super().loadImage(this.IMAGES_WALKING[0]); // Lade das erste Bild des Endbosses
        this.loadImages(this.IMAGES_WALKING); // Lade alle Bilder für die Geh-Animation
        this.loadImages(this.IMAGES_HURT); // Lade alle Bilder für die Verletzungs-Animation
        this.loadImages(this.IMAGES_DEATH); // Lade alle Bilder für die Todes-Animation
        this.x = 2400; // Setze die Startposition des Endbosses weit rechts

        this.healthBar = new BossHealthBar(this); // Initialisiere die HealthBar für den Endboss
        this.animate(); // Starte die Animationen des Endbosses
    }

    throwBomb() {
        if (this.world) { // Prüfe, ob der Endboss eine Referenz zur Welt hat
            let bombX = this.x + 100; // Setze die X-Position der Bombe etwas rechts vom Endboss
            let bombY = this.y + this.height / 10; // Setze die Y-Position der Bombe etwas über dem Boden

            let bomb = new Bomb(bombX, bombY); // Erstelle eine neue Bombe an den angegebenen Koordinaten
            if (bomb) {
                this.world.bossBombs.push(bomb); // Füge die Bombe zur Sammlung der Bomben in der Welt hinzu
            }

            // Wurfsound hinzufügen und abspielen
            const throwSound = new Audio('audio/throw-bomb.mp3');
            throwSound.play();
        }
    }

    animate() {
        // Setze ein Intervall, um die Animationen des Endbosses regelmäßig zu aktualisieren
        setInterval(() => {
            if (this.health > 0 && !this.isDead) { // Prüfe, ob der Endboss noch lebt
                if (!this.isHurt) { // Wenn der Endboss nicht verletzt ist
                    this.playAnimation(this.IMAGES_WALKING); // Spiele die Geh-Animation ab
                }

                // Überprüfe, ob der Charakter nahe genug ist, um Bomben zu werfen
                if (this.world && Math.abs(this.x - this.world.character.x) < 500 && !this.throwBombInterval) {
                    this.startThrowingBombs(); // Starte das Werfen von Bomben, wenn der Charakter nah genug ist
                }

                // Überprüfe, ob der Charakter nahe genug ist, um die Boss-Musik zu starten
                if (this.world && Math.abs(this.x - this.world.character.x) < 500) {
                    if (!this.isBossMusicPlaying) {
                        this.startBossMusic();
                        this.isBossMusicPlaying = true;
                    }
                    this.world.bossReached = true; // Setze bossReached auf true, wenn der Boss erreicht wurde
                }
            }
        }, 1000 / 20); // Aktualisiere die Animationen alle 50 ms (20 FPS)
    }

    startBossMusic() {
        this.world.backgroundMusic.pause(); // Hintergrundmusik pausieren
        this.world.bossMusic.currentTime = 0; // Boss-Musik auf den Anfang setzen
        this.world.bossMusic.play(); // Boss-Musik abspielen
    }

    startThrowingBombs() {
        // Verhindere, dass der Timer mehrfach gesetzt wird
        if (!this.throwBombInterval) {
            this.throwBombInterval = setInterval(() => {
                if (this.health > 0 && !this.isDead) { // Prüfe, ob der Endboss noch lebt
                    this.throwBomb(); // Werfe eine Bombe
                }
            }, 2000); // Wirft alle 5 Sekunden eine Bombe
        }
    }

    draw(ctx) {
        super.draw(ctx); // Zeichnet den Boss selbst
        this.healthBar.draw(ctx); // Zeichnet die HealthBar über dem Boss
    }

    takeDamage() {
        if (this.health > 0 && !this.isDead) {
            this.health--;
            this.playHurtAnimation();
        }
        if (this.health <= 0 && !this.isDead) {
            this.playDeathAnimation();
        }
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
                this.world.bossMusic.pause();
                showWinningScreen();
            }
        }, 1000 / 20); // Zeitintervall zwischen den Bildern der Sterbeanimation
    }
}