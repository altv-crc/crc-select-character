import * as alt from 'alt-client';

export function handleName(name: string) {
    if (name === '' || !name) {
        const textDraw = alt.Utils.drawText2d(
            'Name is invalid.~n~Must include first and last.',
            { x: 0.5, y: 0.1 },
            4,
            0.6,
            new alt.RGBA(255, 0, 0, 255),
            true,
            true
        );
        alt.setTimeout(() => {
            textDraw.destroy();
        }, 3500);
        return;
    }

    if (!name.includes(' ') && !name.includes('_')) {
        const textDraw = alt.Utils.drawText2d(
            'Must include space or _ between first name and last name',
            { x: 0.5, y: 0.1 },
            4,
            0.6,
            new alt.RGBA(255, 0, 0, 255),
            true,
            true
        );
        alt.setTimeout(() => {
            textDraw.destroy();
        }, 3500);
        return;
    }

    name = name.replaceAll(' ', '_');
    const [first, last] = name.split('_'); // Removes more than 2 words for first and last
    if (!first || !last) {
        const textDraw = alt.Utils.drawText2d(
            'Name is invalid.~n~Must include first and last.',
            { x: 0.5, y: 0.1 },
            4,
            0.6,
            new alt.RGBA(255, 0, 0, 255),
            true,
            true
        );
        alt.setTimeout(() => {
            textDraw.destroy();
        }, 3500);
        return;
    }

    alt.emit('crc-native-menu', { destroy: true });

    // player: alt.Player, name: string
    alt.emitServer('crc-select-character-create', `${first}_${last}`);
}


