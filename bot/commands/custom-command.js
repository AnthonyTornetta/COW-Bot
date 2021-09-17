module.exports = class CustomCommand
{
    constructor(name, description)
    {
        if(typeof name === 'string')
            name = [name];

        this._name = name;
        this._description = description;
    }

    /**
     * For a console command: client, split, full command, command name
     * For a discord command: message, command center
     */
    action()
    {
        throw new Error('Not implemented.');
    }

    get name() { return this._name; }
    get description() { return this._description; }
}
