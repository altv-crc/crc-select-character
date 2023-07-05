import * as alt from 'alt-client';
import { Character } from '../shared';

import './characterDelete';
import './characterPick';
import './promptForName';

let characters: Character[];

function showCharacterSelect() {
    const menu = {
        header: 'Character Select',
        noExit: true,
        options: [],
    };

    for (let character of characters) {
        menu.options.push({
            text: character.name,
            type: 'invoke',
            value: character,
            eventName: 'crc-select-character-pick',
        });
    }

    menu.options.push({
        text: 'Create',
        type: 'input',
        value: '',
        eventName: 'crc-select-character-create',
    });

    alt.emit('crc-native-menu', { create: menu });
}

function startCharacterSelect(_characters: Character[]) {
    characters = _characters;
    showCharacterSelect();
}

alt.onServer('crc-select-character-start', startCharacterSelect);
alt.on('crc-select-character-back-to-characters', showCharacterSelect);
