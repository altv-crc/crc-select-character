import * as alt from 'alt-server';

import { Character } from '../shared';

declare module 'alt-shared' {
    interface ICustomServerClientEvent {
        /**
         * Initializes all select character events
         *
         * @memberof ICustomServerClientEvent
         */
        'crc-select-character-init': () => void;

        /**
         * Stops all select character events
         *
         * @memberof ICustomServerClientEvent
         */
        'crc-select-character-finish': () => void;

        /**
         * Opens the character select after `crc-select-character-init` has been called
         *
         * @memberof ICustomServerClientEvent
         */
        'crc-select-character-start': <T = Character>(characters: T[]) => void;
    }
}

declare module 'alt-server' {
    interface ICustomEmitEvent {
        /**
         * Called when the player needs to `create` appearance on a `Character`
         *
         * @memberof ICustomEmitEvent
         */
        'crc-select-character-finish-create': (player: alt.Player, _id: string) => void;

        /**
         * Called when the player has `appearance` on `Character` and needs to resume their session.
         *
         * @memberof ICustomEmitEvent
         */
        'crc-select-character-finish': (player: alt.Player, _id: string) => void;
    }
}
