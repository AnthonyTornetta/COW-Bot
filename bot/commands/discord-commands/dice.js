const CustomCommand = require('../custom-command');
const DiscordUtils = require('../../discord-utils');

module.exports = class Dice extends CustomCommand
{
    constructor()
    {
        super(['d', 'dice', 'roll'], 'COW bot rolls a dice. (?roll 20 rolls a d20)');
    }

    action(msg)
    {
        let split = msg.content.split(' ');
        if(split.length > 1)
        {
            let numsStr = '';
            for(let i = 1; i < split.length; i++)
            {
                let num = parseInt(split[i]);
                if(num >= 1) // also checks if it's actually a number
                {
                    numsStr += ' ' + Math.round((Math.random() * (num - 1) + 1));
                }
                else
                {
                    DiscordUtils.send('Numbers next time.', msg.channel);
                    numsStr = undefined;
                    break;
                }
            }

            if(numsStr)
                DiscordUtils.send("🎲:" + numsStr, msg.channel);
            else
                DiscordUtils.send('Format: roll #>=1', msg.channel);
        }
        else
            DiscordUtils.send('Format: roll #>=1', msg.channel);
    }
};