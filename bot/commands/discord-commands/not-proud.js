const CustomCommand = require('../custom-command');
const DiscordUtils = require('../../discord-utils');

module.exports = class NotProud extends CustomCommand
{
    constructor()
    {
        super('notproud', 'COW bot is not proud of anyone or cow bot is very unpleased with [name]');
    }

    action(msg)
    {
        let mentioned = getMentioned(msg);

        if (mentioned.length === 0)
            DiscordUtils.send('COW bot is not proud of anyone >:(', msg.channel);
        else if (mentioned.length === 1)
            DiscordUtils.send(`COW bot is very unpleased with you <@${mentioned[0].id}>.`, msg.channel);
        else
        {
            let message = 'COW bot is very unpleased with ';

            for (let i = 0; i < mentioned.length; i++)
            {
                if (i + 1 === mentioned.length)
                    message += 'and ';

                message += `<@${mentioned[i].id}>`;

                if (i + 1 === mentioned.length)
                    message += '.';
                else
                    message += ', ';
            }

            if (msg.length > 2000)
                DiscordUtils.send('COW bot is very unpleased >:(', msg.channel);
            else
                DiscordUtils.send(message, msg.channel);
        }
    }
};