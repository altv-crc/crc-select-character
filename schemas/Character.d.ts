declare module 'alt-crc' {
    interface Character {
        /**
         * The `account` that is bound to this character.
         *
         * @type {string}
         * @memberof Character
         */
        account_id?: string;

        /**
         * The first and last name of this character.
         *
         * @type {string}
         * @memberof Character
         */
        name?: string;

        /**
         * The appearance to apply to this character.
         *
         * @type {Appearance}
         * @memberof Character
         */
        appearance?: Appearance;
    }
}
