/**
 * Represents a game level, which contains enemies, clouds, background objects,
 * and collectable items. It also defines the horizontal end boundary of the level.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectables;
    level_end_x = 2300;

    /**
    * Creates a new level instance.
    *
    * @param {Enemy[]} enemies - The array of enemies to include in the level.
    * @param {Cloud[]} clouds - The array of cloud objects for the level.
    * @param {BackgroundObject[]} backgroundObjects - The array of background objects.
    * @param {CollectableObject[]} collectables - The array of collectable items.
    */
    constructor(enemies, clouds, backgroundObjects, collectables) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectables = collectables;
    }
}