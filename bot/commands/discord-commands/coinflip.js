const CustomCommand = require('../custom-command');
const DiscordUtils = require('../../discord-utils');

module.exports = class Coinflip extends CustomCommand
{
    constructor()
    {
        super(['coinflip', 'flipcoin'], 'COW bot flips a coin.');
    }

    action(msg)
    {
        DiscordUtils.send(Math.random() < .5 ? 'Heads' : 'Tails', msg.channel);
    }
};