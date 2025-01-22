/**
 * A global variable that will hold the current level configuration 
 * once {@link initLevel} is called.
 * @type {Level | undefined}
 */
let level1;

/**
 * Initializes the game level by creating a new {@link Level} instance 
 * and assigning it to the global variable {@link level1}. The level 
 * contains pre-defined enemies, clouds, background objects, and collectable items.
 * This function should be called before starting or rendering the game.
 */
function initLevel() {
    level1 = new Level(
        [
            new Enemy(),
            new Enemy(),
            new Enemy(),
            new Enemy(),
            new Enemy(),
            new Enemy(),
            new Endboss()
        ],
        [
            new Cloud()
        ],
        [
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Sky.png', -720),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/BG_Decor.png', -720),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Middle_Decor.png', -720),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Foreground.png', -720),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Ground.png', -720),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Sky.png', 0),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/BG_Decor.png', 0),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Middle_Decor.png', 0),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Foreground.png', 0),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Ground.png', 0),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Sky.png', 720),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/BG_Decor.png', 720),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Middle_Decor.png', 720),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Foreground.png', 720),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Ground.png', 720),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Sky.png', 1440),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/BG_Decor.png', 1440),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Middle_Decor.png', 1440),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Foreground.png', 1440),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Ground.png', 1440),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Sky.png', 2160),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/BG_Decor.png', 2160),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Middle_Decor.png', 2160),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Foreground.png', 2160),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Ground.png', 2160),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Sky.png', 2880),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/BG_Decor.png', 2880),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Middle_Decor.png', 2880),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Foreground.png', 2880),
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Ground.png', 2880)
        ],
        [
            new CollectableObject(0, 360, 'coin', 130, 130),
            new CollectableObject(0, 310, 'coin', 130, 130),
            new CollectableObject(0, 260, 'coin', 130, 130),
            new CollectableObject(0, 210, 'coin', 130, 130),
            new CollectableObject(0, 160, 'coin', 130, 130),
            new CollectableObject(0, 110, 'coin', 130, 130),
            new CollectableObject(300, 390, 'knife', 70, 70),
            new CollectableObject(350, 390, 'knife', 70, 70),
            new CollectableObject(400, 360, 'coin', 130, 130),
            new CollectableObject(450, 360, 'coin', 130, 130),
            new CollectableObject(500, 360, 'coin', 130, 130),
            new CollectableObject(550, 360, 'coin', 130, 130),
            new CollectableObject(600, 360, 'coin', 130, 130),
            new CollectableObject(700, 390, 'knife', 70, 70),
            new CollectableObject(750, 390, 'knife', 70, 70),
            new CollectableObject(800, 390, 'knife', 70, 70),
            new CollectableObject(850, 390, 'knife', 70, 70),
            new CollectableObject(650, 160, 'coin', 130, 130),
            new CollectableObject(700, 160, 'coin', 130, 130),
            new CollectableObject(750, 160, 'coin', 130, 130),
            new CollectableObject(1050, 360, 'coin', 130, 130),
            new CollectableObject(1100, 360, 'coin', 130, 130),
            new CollectableObject(1150, 360, 'coin', 130, 130),
            new CollectableObject(1180, 310, 'coin', 130, 130),
            new CollectableObject(1210, 260, 'coin', 130, 130),
            new CollectableObject(1240, 210, 'coin', 130, 130),
            new CollectableObject(1270, 390, 'knife', 70, 70),
            new CollectableObject(1270, 160, 'coin', 130, 130),
            new CollectableObject(1320, 390, 'knife', 70, 70),
            new CollectableObject(1300, 210, 'coin', 130, 130),
            new CollectableObject(1330, 260, 'coin', 130, 130),
            new CollectableObject(1360, 310, 'coin', 130, 130),
            new CollectableObject(1390, 360, 'coin', 130, 130),
            new CollectableObject(1440, 360, 'coin', 130, 130),
            new CollectableObject(1490, 360, 'coin', 130, 130),
            new CollectableObject(2000, 390, 'knife', 70, 70),
            new CollectableObject(2050, 390, 'knife', 70, 70),
        ]
    );
};