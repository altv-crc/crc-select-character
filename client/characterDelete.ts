import * as alt from 'alt-client';
import { Character } from 'alt-crc';

export function show(character: Character) {
    alt.emit('crc-native-menu', { destroy: true });
    alt.emit('crc-native-menu', {
        create: {
            header: `Delete ${character.name}?`,
            backEvent: 'crc-select-character-pick',
            noExit: true,
            options: [
                {
                    text: 'Yes',
                    type: 'invoke',
                    value: character._id,
                    eventName: 'crc-select-character-delete-confirm',
                },
                {
                    text: 'No',
                    type: 'invoke',
                    value: character,
                    eventName: 'crc-select-character-pick',
                },
            ],
        },
    });
}

export function confirm(_id: string) {
    alt.emit('crc-native-menu', { destroy: true });
    alt.emitServer('crc-select-character-delete-confirm', _id);

    const textDraw = alt.Utils.drawText2d(
        'Refreshing Characters...',
        { x: 0.5, y: 0.1 },
        4,
        0.6,
        new alt.RGBA(255, 255, 255, 255),
        true,
        true
    );

    alt.setTimeout(() => {
        textDraw.destroy();
    }, 4000);
}
