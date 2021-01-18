import { Image } from './image.js';

export class ImageGif extends Image {
    constructor(path) {
        if (!path.match(/\.png/)) {
            throw new Error(`${path} is not a png image`);
        }
        super(path);
    }
}
