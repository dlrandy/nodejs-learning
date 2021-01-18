import { Image } from './image.mjs';

function createImage(name) {
    return new Image(name);
}

const image = createImage('photot.jpg');
console.log(image);
