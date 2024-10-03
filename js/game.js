let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    // Lade den Startscreen und warte auf Interaktion
    showStartScreen();
}

function showStartScreen() {
    // Zeige den Startscreen
    const startScreen = document.getElementById('startScreen');
    const startButton = document.getElementById('startButton');

    // Warte auf einen Klick auf den Startbutton
    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';  // Verstecke den Startscreen
        startGame();  // Starte das Spiel
    });
}

function showTutorial() {
    let content = document.getElementById('keybindsDiv');

    content.innerHTML = `
    <h2 style="text-align: center; font-size: 40px; margin-bottom: 8px;">How to play</h1>
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
    `;
}

function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    // Starte die Hintergrundmusik
    world.backgroundMusic.play().catch(error => {
        console.log("Fehler beim Start der Hintergrundmusik: " + error);
    });

    console.log('My Character is', world.character);

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

        if (event.keyCode == 16) {  // Wenn Shift gedrückt wird
            keyboard.RSHIFT = true;  // Setze RSHIFT auf true
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
            world.canThrow = true;  // Setze canThrow auf true zurück
        }
    });
}
