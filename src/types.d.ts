export type socketData = {
    nick:   string;
    msg:    string;
    date:   number;
    color:  string;
    home:   string;
}

export type commandObject = {
    handler: (parsed: [string, ...Array<string>], data: socketData) => void;

    // stuff for help command
    description: string;
    exampleArgs?: string;
    properName?: string;
}

export type config = {
    nick: string;
    color: string;
    prefix: string;
    version: string;
}