import * as alt from 'alt-client';
import { Character } from '../shared';

declare module 'alt-client' {
    interface ICustomEmitEvent {
        /**
         * Go to previous character that was `picked` or provide a character to `pick`.
         *
         * @memberof ICustomEmitEvent
         */
        'crc-select-character-pick': <T = Character>(character: T) => void;

        /**
         * Return to character selection.
         *
         * @memberof ICustomEmitEvent
         */
        'crc-select-character-back-to-characters': () => void;
    }
}
