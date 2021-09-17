const CustomCommand = require('../custom-command');
const DiscordUtils = require('../../discord-utils');

module.exports = class Forgive extends CustomCommand
{
    constructor()
    {
        super('forgive', 'COW bot will forgive all (or) cow boit will forgive you, [name]');
    }

    action(msg)
    {
        let mentioned = getMentioned(msg);

        if (mentioned.length === 0)
            DiscordUtils.send('COW bot will forgive all.', msg.channel);
        else if (mentioned.length === 1)
            DiscordUtils.send(`COW bot will forgive you <@${mentioned[0].id}>.`, msg.channel);
        else
        {
            let message = 'COW bot will forgive ';

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
                DiscordUtils.send('COW bot will forgive a lot of people', msg.channel);
            else
                DiscordUtils.send(message, msg.channel);
        }
    }
};