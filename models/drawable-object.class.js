/**
 * A base class for drawable objects in the game. It manages loading and 
 * caching of images as well as drawing them on a canvas.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 175;
    height = 200;
    width = 200;

    /**
     * Loads a single image from the given path and sets it as the object's primary image.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object's primary image on the provided canvas context at (x, y).
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of a canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads and caches an array of images, storing each in the imageCache property.
     * @param {string[]} arr - An array of image paths to load and cache.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}