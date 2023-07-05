# [CRC][TS] Select Character

<sup>Supported by <a href="https://github.com/orgs/altv-crc/">CRC</a></sup>

![](https://i.imgur.com/VCpvEJ6.png)

A simple character selection menu. Create any number of characters.

* Select a Character
* Delete a Character
* Create a Character

## Requires

- [CRC DB](https://github.com/altv-crc/crc-db)
- [CRC Instructional Buttons](https://github.com/altv-crc/crc-instructional-buttons)
- [CRC Native Menu](https://github.com/altv-crc/crc-native-menu)
- Login Plugin (Choose 1)
  - [CRC Dicord Login](https://github.com/altv-crc/crc-discord-login)
  - [CRC Login](https://github.com/altv-crc/crc-login)

_Highly recommended to get the extension, for better event handling._

## Installation

1. Create a folder in your `src` folder called `crc-select-character`.

2. Add the `TypeScript` files from this resource, to that folder.

3. Modify `server.toml` and ensure it loads whatever you named the folder.

In the case of the example above it should be `crc-select-character`.

```
resources = [ 
    'crc-db',
    'crc-native-menu',
    'crc-instructional-buttons',
    'crc-discord-login',
    'crc-select-character'
    'watch-resources'
]
```

_Your resource structure may vary_

## Developers

* Selection will immediately follow the login plugins.
* A selection event or creation event will be pushed after selection.

### Server Events

#### crc-select-character-finish

This is called when a player has selected an existing character with the `appearance` property applied to the document.

```ts
alt.on('crc-select-character-finish', (player: alt.Player, character: Character) => {
    //
})
```

#### crc-select-character-finish-create

This is called when a player has created a character but does not have any `appearance` information.

```ts
alt.on('crc-select-character-finish-create', (player: alt.Player, character: Character) => {
    //
})
```

### onServer Events

#### crc-select-character-start

This is called when the character selection is opened, and shows a list of all characters.

```ts
alt.onServer('crc-select-character-start', (characters: Character[]) => {
    //
})
```

#### crc-select-character-finish

This is called when the character selection is completed. All events are unloaded.

```ts
alt.onServer('crc-select-character-finish', () => {
    //
})
```

### Client Events

#### crc-select-character-pick

This is called when a player has picked the character in the menu.

This does not mean they are `choosen` to spawn. This is when they're given more options like `select`, `delete`, etc.

```ts
alt.on('crc-select-character-pick', (characters: Character[]) => {
    //
})
```

#### crc-select-character-back-to-characters

This is called whenever a player re-renders the menu.

* Occurs when going back a menu or two

```ts
alt.on('crc-select-character-back-to-characters', (characters: Character[]) => {
    //
})
```