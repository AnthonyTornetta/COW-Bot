const CustomCommand = require('../custom-command');

module.exports = class Stop extends CustomCommand
{
    constructor()
    {
        super('stop', 'Exits the bot.');
    }

    action(client)
    {
        client.destroy();
        return false;
    }
};