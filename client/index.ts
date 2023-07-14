import * as alt from 'alt-client';
import * as CharacterDelete from './characterDelete';
import * as CharacterPick from './characterPick';
import * as CharacterCreate from './characterCreate';

import { Character } from 'alt-crc';

import './characterDelete';
import './characterPick';
import './characterCreate';

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
        eventName: 'crc-select-character-create-new',
    });

    alt.emit('crc-native-menu', { create: menu });
}

function startCharacterSelect(_characters: Character[]) {
    characters = _characters;
    showCharacterSelect();
}

alt.onServer('crc-select-character-init', () => {
    alt.onServer('crc-select-character-start', startCharacterSelect);
    alt.on('crc-select-character-back-to-characters', showCharacterSelect);

    alt.on('crc-select-character-delete-confirm', CharacterDelete.confirm);
    alt.on('crc-select-character-delete', CharacterDelete.show);

    alt.on('crc-select-character-pick', CharacterPick.show);
    alt.on('crc-select-character-select', CharacterPick.select);

    alt.on('crc-select-character-create-new', CharacterCreate.handleName);
});

alt.onServer('crc-select-character-finish', () => {
    alt.offServer('crc-select-character-start', startCharacterSelect);
    alt.off('crc-select-character-back-to-characters', showCharacterSelect);

    alt.off('crc-select-character-delete-confirm', CharacterDelete.confirm);
    alt.off('crc-select-character-delete', CharacterDelete.show);

    alt.off('crc-select-character-pick', CharacterPick.show);
    alt.off('crc-select-character-select', CharacterPick.select);

    alt.off('crc-select-character-create-new', CharacterCreate.handleName);
});
