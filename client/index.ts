import * as native from 'natives';
import * as alt from 'alt-client';
import * as CharacterDelete from './characterDelete';
import * as CharacterPick from './characterPick';
import * as CharacterCreate from './characterCreate';
import * as camera from './camera';
import { config } from '../shared/index';
import { Character } from 'alt-crc';

import './characterDelete';
import './characterPick';
import './characterCreate';

let characters: Character[];
let interval: number;

function tick() {
    native.disableAllControlActions(0);
}

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
            id: 'character',
        });
    }

    menu.options.push({
        text: 'Create',
        type: 'input',
        value: '',
        eventName: 'crc-select-character-create-new',
    });

    updateCamera({ text: '', value: characters[0], id: 'character' });
    alt.emit('crc-native-menu', { create: menu });
}

function startCharacterSelect(_characters: Character[]) {
    characters = _characters;
    showCharacterSelect();
}

function updateCamera(option: { text: string; value: Character; id: string }) {
    if (option.id !== 'character') {
        alt.emit('crc-preview-character-destroy');
        camera.update(config.position.nothing);
        return;
    }

    if (option.value == undefined) {
        alt.emit('crc-preview-character-destroy');
        camera.update(config.position.nothing);
        return;
    }

    alt.emit('crc-preview-character-update', option.value.appearance, config.position.player);
}

function retargetCamera(ped: number) {
    camera.update(ped);
}

alt.onServer('crc-select-character-init', () => {
    native.setClockTime(8, 0, 0);
    native.pauseClock(true);
    native.displayRadar(false);

    interval = alt.setInterval(tick, 0);

    alt.onServer('crc-select-character-start', startCharacterSelect);
    alt.on('crc-select-character-back-to-characters', showCharacterSelect);

    alt.on('crc-select-character-delete-confirm', CharacterDelete.confirm);
    alt.on('crc-select-character-delete', CharacterDelete.show);

    alt.on('crc-select-character-pick', CharacterPick.show);
    alt.on('crc-select-character-select', CharacterPick.select);

    alt.on('crc-select-character-create-new', CharacterCreate.handleName);

    alt.on('crc-native-menu-option-changed', updateCamera);

    alt.on('crc-preview-character-updated', retargetCamera);
});

alt.onServer('crc-select-character-finish', () => {
    native.displayRadar(true);
    native.pauseClock(false);

    camera.destroy();
    alt.clearInterval(interval);

    alt.offServer('crc-select-character-start', startCharacterSelect);
    alt.off('crc-select-character-back-to-characters', showCharacterSelect);

    alt.off('crc-select-character-delete-confirm', CharacterDelete.confirm);
    alt.off('crc-select-character-delete', CharacterDelete.show);

    alt.off('crc-select-character-pick', CharacterPick.show);
    alt.off('crc-select-character-select', CharacterPick.select);

    alt.off('crc-select-character-create-new', CharacterCreate.handleName);

    alt.off('crc-native-menu-option-changed', updateCamera);

    alt.off('crc-preview-character-updated', retargetCamera);
});
