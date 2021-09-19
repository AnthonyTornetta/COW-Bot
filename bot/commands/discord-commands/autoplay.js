const CustomCommand = require('../custom-command');
const DiscordUtils = require('../../discord-utils');

module.exports = class Skip extends CustomCommand
{
    constructor()
    {
        super(['autoplay', 'a', 'ap'], 'COW bot autoplays the next song song based on the wind current.');
    }

    action(msg)
    {
        if(!msg.member.voiceChannelID)
        {
            DiscordUtils.send('Must be in the voice channel to use this command!', msg.channel);
            return;
        }

        global.musicBotManager.autoplay(msg.channel, (err, res) =>
        {
            if(err)
            {
                DiscordUtils.send(err, msg.channel);
            }
            else
            {
                if(res)
                    DiscordUtils.send('Autoplay Enabled :fire::fire::fire:', msg.channel);
                else
                    DiscordUtils.send('Autoplay Disabled :ice_cube::ice_cube::ice_cube:', msg.channel);
            }
        });
    }
};