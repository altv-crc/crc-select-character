import * as alt from 'alt-client';
import { Character } from 'alt-crc';

let character: Character;

export function show(_character: Character) {
    if (_character) {
        character = _character;
    }

    alt.emit('crc-native-menu', { destroy: true });
    alt.emit('crc-native-menu', {
        create: {
            header: character.name,
            noExit: true,
            backEvent: 'crc-select-character-back-to-characters',
            options: [
                {
                    text: 'Select',
                    type: 'invoke',
                    value: character._id,
                    eventName: 'crc-select-character-select',
                },
                {
                    text: 'Delete',
                    type: 'invoke',
                    value: character,
                    eventName: 'crc-select-character-delete',
                },
                {
                    text: 'Back',
                    type: 'invoke',
                    value: undefined,
                    eventName: 'crc-select-character-back-to-characters',
                },
            ],
        },
    });
}

export function select(_id: string) {
    alt.emit('crc-native-menu', { destroy: true });
    alt.emitServer('crc-select-character-select-confirm', _id);
}
