import * as alt from 'alt-client';
import { Character } from '../shared';

declare module 'alt-client' {
    export function onServer<T = Character>(
        eventName: 'crc-select-character-start',
        listener: (characters: T[]) => void
    );

    export function onServer(eventName: 'crc-select-character-init', listener: () => void);

    export function onServer(eventName: 'crc-select-character-finish', listener: () => void);

    export function on<T = Character>(eventName: 'crc-select-character-pick', listener: (character: T) => void);

    export function on(eventName: 'crc-select-character-back-to-characters', listener: () => void);
}
