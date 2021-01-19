/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { ConfigTemplate } from './configTemplate.mjs';

export class JsonConfig extends ConfigTemplate {
    _deserialize(data) {
        return JSON.parse(data);
    }

    _serialize(data) {
        return JSON.stringify(data, null, ' ');
    }
}
