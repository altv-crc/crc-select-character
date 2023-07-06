import * as alt from 'alt-server';

import { Character } from '../shared';

declare module 'alt-server' {
    export function on(
        eventName: 'crc-select-character-finish',
        listener: (player: alt.Player, character: Character) => void
    ): void;

    export function on(
        eventName: 'crc-select-character-finish-create',
        listener: (player: alt.Player, character: Character) => void
    ): void;
}

