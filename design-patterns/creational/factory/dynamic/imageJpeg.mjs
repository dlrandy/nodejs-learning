import { Image } from './image.js';

export class ImageGif extends Image {
    constructor(path) {
        if (!path.match(/\.jpeg/)) {
            throw new Error(`${path} is not a jpeg image`);
        }
        super(path);
    }
}
