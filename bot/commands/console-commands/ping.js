const CustomCommand = require('../custom-command');

module.exports = class Ping extends CustomCommand
{
    constructor()
    {
        super('ping', 'Says Pong.');
    }

    action()
    {
        console.log('Pong');

        return true;
    }
};