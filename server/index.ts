import * as alt from 'alt-server';
import * as crc from '@stuyk/cross-resource-cache';
import { Account, Character } from '../shared';

let isDatabaseReady = false;

crc.database.onReady(() => {
    isDatabaseReady = true;
});

const selectingCharacter: { [id: string]: { account: Account; characters: Character[] } } = {};

async function getCharacters(player: alt.Player, account: Account) {
    const characters = await crc.database.getMany<Character>({ account_id: account._id }, 'characters');
    selectingCharacter[player.id] = { account, characters };
    return characters;
}

async function initializeCharacterSelect(player: alt.Player, account: Account) {
    player.emit('crc-select-character-init');
    await alt.Utils.wait(1000);
    await openCharacterSelect(player, account);
}

async function openCharacterSelect(player: alt.Player, account: Account) {
    await alt.Utils.waitFor(() => isDatabaseReady);
    const characters = await getCharacters(player, account);
    alt.emitClient(player, 'crc-select-character-start', characters);
}

alt.onClient('crc-select-character-create', async (player: alt.Player, name: string) => {
    if (!selectingCharacter[player.id]) {
        player.kick('No Character Select Session');
        return;
    }

    const id = await crc.database.create<Character>(
        { account_id: selectingCharacter[player.id].account._id, name, appearance: undefined },
        'characters'
    );

    const document = await crc.database.get<Character>({ _id: id }, 'characters');
    if (document) {
        alt.log(`Created Character: ${document._id}`);
    }

    openCharacterSelect(player, selectingCharacter[player.id].account);
});

alt.onClient('crc-select-character-delete-confirm', async (player: alt.Player, _id: string) => {
    if (!selectingCharacter[player.id]) {
        player.kick('No Character Select Session');
        return;
    }

    const index = selectingCharacter[player.id].characters.findIndex((x) => x._id === _id);
    if (index <= -1) {
        openCharacterSelect(player, selectingCharacter[player.id].account);
        return;
    }

    selectingCharacter[player.id].characters.splice(index, 1);
    const didDelete = await crc.database.deleteDocument(_id, 'characters');
    if (didDelete) {
        alt.log(`Deleted Character: ${_id}`);
    }

    openCharacterSelect(player, selectingCharacter[player.id].account);
});

alt.onClient('crc-select-character-select-confirm', async (player: alt.Player, _id: string) => {
    if (!selectingCharacter[player.id]) {
        player.kick('No Character Select Session');
        return;
    }

    const index = selectingCharacter[player.id].characters.findIndex((x) => x._id === _id);
    if (index <= -1) {
        openCharacterSelect(player, selectingCharacter[player.id].account);
        return;
    }

    const character = selectingCharacter[player.id].characters[index];
    if (!character) {
        openCharacterSelect(player, selectingCharacter[player.id].account);
        return;
    }

    if (character.appearance) {
        alt.log(`Character Selected: ${character.name}`);

        // player: alt.Player, character: Character
        alt.emit('crc-select-character-finish', player, character._id);
    } else {
        alt.log(`Creation Request: ${character.name}`);

        // player: alt.Player, character: Character
        alt.emit('crc-select-character-finish-create', player, character._id);
    }

    player.emit('crc-select-character-finish');
    delete selectingCharacter[player.id];
});

// Support for other login types
alt.on('crc-discord-login-finish', initializeCharacterSelect);
alt.on('crc-login-finish', initializeCharacterSelect);
