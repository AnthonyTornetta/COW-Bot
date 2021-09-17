const CustomCommand = require('../custom-command');
const DiscordUtils = require('../../discord-utils');

module.exports = class Stop extends CustomCommand
{
    constructor()
    {
        super('stop', 'COW bot leaves the voice call.');
    }

    action(msg)
    {
        if(!msg.member.voiceChannelID)
        {
            DiscordUtils.send('Must be in the voice channel to use this command!', msg.channel);
            return;
        }

        global.musicBotManager.stop(msg.channel);
    }
};