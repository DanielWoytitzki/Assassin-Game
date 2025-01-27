let canvas;
let world;
let keyboard = new Keyboard();
let win_sound = new Audio('audio/win-sound.mp3');
const allAudios = [];
let isMuted = false;
const OriginalAudio = Audio;
window.Audio = function (...args) {
    const instance = new OriginalAudio(...args);
    allAudios.push(instance);
    return instance;
};

/**
 * Initializes the game by hiding the start screen,
 * showing a loading screen, loading resources,
 * and finally starting the game once resources are loaded.
 */
function init() {
    startScreen.style.display = 'none';
    showLoadingScreen();
    loadResources().then(() => {
        hideLoadingScreen();
        initLevel();
        startGame();
    });
}

/**
 * Displays the loading screen (e.g., while assets are being loaded).
 */
function showLoadingScreen() {
    document.getElementById('loadingScreen').style.display = 'flex';
}

/**
 * Hides the loading screen once assets are fully loaded.
 */
function hideLoadingScreen() {
    document.getElementById('loadingScreen').style.display = 'none';
}

/**
 * Displays the winning screen overlay and plays a win sound.
 * Shows the number of collected coins on the screen.
 */
function showWinningScreen() {
    document.getElementById('winningScreen').style.display = 'flex';
    win_sound.play();
    document.getElementById('scoreDisplay').innerText = `Coins Collected: ${world.collectedCoins} / 27`;
}

/**
 * Reloads the current page to restart the game.
 */
function restartGame() {
    window.location.reload();
}

/**
 * Loads all required images for the game by creating `Image` objects
 * and waiting for their `onload` or `onerror` events before resolving.
 * @returns {Promise<void>} A promise that resolves once all images have finished loading.
 */
function loadResources() {
    return new Promise((resolve) => {
        let imagesToLoad = [];
        let imagePaths = [
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Sky.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/BG_Decor.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Middle_Decor.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Foreground.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Ground.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Sky.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/BG_Decor.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Middle_Decor.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Foreground.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Ground.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Sky.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/BG_Decor.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Middle_Decor.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Foreground.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Ground.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Sky.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/BG_Decor.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Middle_Decor.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Foreground.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Ground.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Sky.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/BG_Decor.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Middle_Decor.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Foreground.png',
            'img/background/PNG/Cartoon_Forest_BG_01/Layers/Ground.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
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
            'img/character-rogue/Idle/idle18.png',
            'img/character-rogue/Walk/walk1.png',
            'img/character-rogue/Walk/walk2.png',
            'img/character-rogue/Walk/walk3.png',
            'img/character-rogue/Walk/walk4.png',
            'img/character-rogue/Walk/walk5.png',
            'img/character-rogue/Walk/walk6.png',
            'img/character-rogue/Jump/jump1.png',
            'img/character-rogue/Jump/jump2.png',
            'img/character-rogue/Jump/jump3.png',
            'img/character-rogue/Jump/jump4.png',
            'img/character-rogue/Jump/jump5.png',
            'img/character-rogue/Jump/jump6.png',
            'img/character-rogue/Jump/jump7.png',
            'img/character-rogue/Death/death1.png',
            'img/character-rogue/Death/death2.png',
            'img/character-rogue/Death/death3.png',
            'img/character-rogue/Death/death4.png',
            'img/character-rogue/Death/death5.png',
            'img/character-rogue/Death/death6.png',
            'img/character-rogue/Death/death7.png',
            'img/character-rogue/Death/death8.png',
            'img/character-rogue/Death/death9.png',
            'img/character-rogue/Death/death10.png',
            'img/character-rogue/Hurt/hurt1.png',
            'img/character-rogue/Hurt/hurt2.png',
            'img/character-rogue/Hurt/hurt3.png',
            'img/character-rogue/Hurt/hurt4.png',
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
            'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Walk/0_Warrior_Walk_029.png',
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
            'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_1/Died/0_Warrior_Died_029.png',
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
            'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Communication/0_Warrior_Communication_029.png',
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
            'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Hurt/0_Warrior_Hurt_014.png',
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
            'img/enemies/Warrior_animations/Left_Side/PNG Sequences/Warrior_clothes_2/Died/0_Warrior_Died_029.png',
            'img/bomb/bomb.png',
            'img/8_coin/coin_1.png',
            'img/knife/PNG/knife.png',
            'img/knife/PNG/knife-removebg-preview.png'
        ];
        imagePaths.forEach((path) => {
            let img = new Image();
            img.src = path;
            imagesToLoad.push(img);
        });
        Promise.all(imagesToLoad.map(img => new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
        }))).then(() => {
            resolve();
        });
    });
}

/**
 * Displays a tutorial overlay with basic game controls.
 * Called when the user requests instructions (e.g., "How to play").
 */
function showTutorial() {
    let content = document.getElementById('keybindsDiv');
    content.innerHTML = `
    <div class="tutorial-responsive">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-left: 50px; margin-right: 50px;">
            <div style="width: 30px; height: 30px;";></div>
                <h2 style="text-align: center; font-size: 40px;">How to play</h2>
            <img style="width: 30px; height: 30px; cursor: pointer;" onclick="closeTutorial();" src="img/icons/close-icon.svg">
        </div>
        <div class="tutorial-section">
            <div class="tutorial-content-box">
                <img src="img/icons/buttons.png">
                <p>Use the left and right arrow keys to move</p>
            </div>
            <div class="tutorial-content-box">
                <img src="img/icons/keyboard.png">
                <p>Use the space bar to jump</p>
            </div>
            <div class="tutorial-content-box">
                <img src="img/icons/shift.png">
                <p>Use the right Shift key to throw your kunai</p>
            </div>
        </div>
    </div>
    `;
}

function closeTutorial() {
    let content = document.getElementById('keybindsDiv');
    content.innerHTML = '';
}

/**
 * Starts the game by setting up the canvas, creating a new World instance,
 * playing background music, and adding key event listeners for user input.
 * If {@link level1} is not yet defined, the game won't start.
 */
function startGame() {
    if (!level1) {
        return;
    }
    canvas = document.getElementById('canvas');
    if (!keyboard) {
        keyboard = new Keyboard();
    }
    world = new World(canvas, keyboard);
    world.backgroundMusic.play().catch(error => {
    });
    window.addEventListener("keydown", (event) => {
        if (event.keyCode == 39) {
            keyboard.RIGHT = true;
        }
        if (event.keyCode == 37) {
            keyboard.LEFT = true;
        }
        if (event.keyCode == 38) {
            keyboard.UP = true;
        }
        if (event.keyCode == 40) {
            keyboard.DOWN = true;
        }
        if (event.keyCode == 32) {
            keyboard.SPACE = true;
        }
        if (event.keyCode == 16) {
            keyboard.RSHIFT = true;
        }
    });
    window.addEventListener("keyup", (event) => {
        if (event.keyCode == 39) {
            keyboard.RIGHT = false;
        }
        if (event.keyCode == 37) {
            keyboard.LEFT = false;
        }
        if (event.keyCode == 38) {
            keyboard.UP = false;
        }
        if (event.keyCode == 40) {
            keyboard.DOWN = false;
        }
        if (event.keyCode == 32) {
            keyboard.SPACE = false;
        }
        if (event.keyCode == 16) {
            keyboard.RSHIFT = false;
            world.canThrow = true;
        }
    });
}

/**
 * Sets up touch event listeners for mobile controls, updating the keyboard
 * properties just like normal keyboard events do.
 */
setInterval(() => {
    document.getElementById('btnLeft').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btnLeft').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('btnRight').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btnRight').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('btnJump').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btnJump').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('btnThrow').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RSHIFT = true;
    });
    document.getElementById('btnThrow').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.RSHIFT = false;
    });
}, 50);

/**
 * Toggles the muted state of all audio elements tracked in {@link allAudios}.
 * If `isMuted` is `true`, unmutes all audios; otherwise, mutes them.
 */
function toggleMuteAllAudios() {
    isMuted = !isMuted;
    allAudios.forEach(audio => audio.muted = isMuted);

    const img = document.getElementById('toggleMuteImage');
  
    if (img.getAttribute('src') === 'img/icons/mute.png') {
      img.setAttribute('src', 'img/icons/volume.png');
    } else {
      img.setAttribute('src', 'img/icons/mute.png');
    }
}