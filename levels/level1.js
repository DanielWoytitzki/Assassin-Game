let level1;

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
            new BackgroundObject('img/background/PNG/Cartoon_Forest_BG_01/Layers/Ground.png', 2160)
        ],
        [
            new CollectableObject(1050, 360, 'coin', 130, 130),
            new CollectableObject(1100, 360, 'coin', 130, 130),
            new CollectableObject(1150, 360, 'coin', 130, 130),
            new CollectableObject(1180, 310, 'coin', 130, 130),
            new CollectableObject(1210, 260, 'coin', 130, 130),
            new CollectableObject(1240, 210, 'coin', 130, 130),
            new CollectableObject(1270, 160, 'coin', 130, 130),
            new CollectableObject(1300, 210, 'coin', 130, 130),
            new CollectableObject(1330, 260, 'coin', 130, 130),
            new CollectableObject(1360, 310, 'coin', 130, 130),
            new CollectableObject(1390, 360, 'coin', 130, 130),
            new CollectableObject(1440, 360, 'coin', 130, 130),
            new CollectableObject(1490, 360, 'coin', 130, 130),
            new CollectableObject(300, 390, 'knife', 70, 70)
        ]
    );
};