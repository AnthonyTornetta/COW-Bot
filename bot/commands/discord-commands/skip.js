const CustomCommand = require('../custom-command');
const DiscordUtils = require('../../discord-utils');

module.exports = class Skip extends CustomCommand
{
    constructor()
    {
        super(['skip', 's'], 'COW bot skips the current song.');
    }

    action(msg)
    {
        if(!msg.member.voiceChannelID)
        {
            DiscordUtils.send('Must be in the voice channel to use this command!', msg.channel);
            return;
        }

        global.musicBotManager.skip(msg.channel, (err, res) =>
        {
            if(err)
                DiscordUtils.send(err, msg.channel);
            else
            {
                if(res === 'leave')
                {
                    DiscordUtils.send(':wave:', msg.channel);
                }
                else if(res === 'skip')
                {
                    DiscordUtils.send(':fast_forward:', msg.channel);
                }
            }
        });
    }
};