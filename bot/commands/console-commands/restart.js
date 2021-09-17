const CustomCommand = require('../custom-command');

const auth = require('../../../auth.json');

module.exports = class Restart extends CustomCommand
{
    constructor()
    {
        super('restart', 'Logs out then logs back in.');
    }

    action(client)
    {
        client.destroy();
        client.login(auth.token);
        console.log('Restarted!');
        return true;
    }
};