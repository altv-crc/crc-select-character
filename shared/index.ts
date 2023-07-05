export interface Account {
    _id?: string;
}

export interface Character {
    _id?: string;
    account_id?: string;
    name?: string;
    appearance?: unknown;
}
