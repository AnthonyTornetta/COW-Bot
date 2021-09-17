const CustomCommand = require('../custom-command');

module.exports = class Announce extends CustomCommand
{
    constructor()
    {
        super('announce', 'Announces something to every server.');
    }

    action(client, split)
    {
        if (split.length > 1)
        {
            client.guilds.forEach(g =>
            {
                let c = g.channels.filter(channel =>
                {
                    return (channel.name === 'general' && channel.type === 'text');
                });
                
                c.forEach(channel =>
                {
                    send('@everyone >> ' + cmd.substring(command.length), channel);
                });
            });
        }
        else
            console.log('Must specify what to send!');
        
        return true;
    }
};