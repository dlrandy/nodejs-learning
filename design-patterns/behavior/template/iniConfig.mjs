/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import ini from 'ini';
import { ConfigTemplate } from './configTemplate.mjs';

export class IniConfig extends ConfigTemplate {
    _deserialize(data) {
        return ini.parse(data);
    }

    _serialize(data) {
        return ini.stringify(data);
    }
}
