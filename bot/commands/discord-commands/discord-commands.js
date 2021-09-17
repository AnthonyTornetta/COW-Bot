const ActionFactory = require('../../action-factory');
const CustomCommand = require('../custom-command');

const Coinflip = require('./coinflip');
const Dice = require('./dice');
const Forgive = require('./forgive');
const Help = require('./help');
const NotProud = require('./not-proud');
const Proud = require('./proud');
const Weather = require('./weather');
const Play = require('./play');
const Skip = require('./skip');
const Stop = require('./stop');

module.exports = function addAllCommands(cmdCenter)
{
    cmdCenter.addCommand(new Help());
    cmdCenter.addCommand(new Coinflip());
    cmdCenter.addCommand(new Dice());
    cmdCenter.addCommand(new Forgive());
    cmdCenter.addCommand(new NotProud());
    cmdCenter.addCommand(new Proud());
    cmdCenter.addCommand(new Weather());
    cmdCenter.addCommand(new Play());
    cmdCenter.addCommand(new Skip());
    cmdCenter.addCommand(new Stop());

    addSimpleCommands(cmdCenter);
}

function addSimpleCommands(cmdCenter)
{
    const thotlist = [ 'Rachel', 'Fares', 'Jose', 'Angel', 'Melina', 'Miguel', 'Dan', 'Cornchip', 'Dom', 'Ethan', 'Roman', 'Troy', 'Pat', 'Ken' ];
    const edgelist = [ 'Troy', 'Angel', 'Miguel', 'Jose', 'Dan', 'Ken' ];
    const peenerlist = [ 'Jose', 'Dom', 'Dan', 'Pat', 'Miguel', 'Angel', 'Cornchip', 'Troy', 'Ethan', 'Roman', 'Melina', 'Rachel', 'Fares', 'Ken' ];
    const nutlist = [ 'Ken', 'Roman', 'Fares', 'Ethan', 'Dan', 'Troy', 'Cornchip', 'Dom', 'Miguel', 'Jose', 'Pat', 'Angel', 'Rachel', 'Melina' ];

    cmdCenter.addCommand(createCustomCommand(['triangle', 'delta'], ActionFactory.sendMessageAction('Δ'), 'Δ'));
    cmdCenter.addCommand(createCustomCommand('square', ActionFactory.sendMessageAction('■'), '■'));
    cmdCenter.addCommand(createCustomCommand('theta', ActionFactory.sendMessageAction('θ'), 'θ'));
    cmdCenter.addCommand(createCustomCommand('yuri', ActionFactory.sendMessageAction('yuridopted'), 'Tells a joke'));
    cmdCenter.addCommand(createCustomCommand('ligma', ActionFactory.sendMessageAction('What\'s Ligma?'), 'Tells a joke'));
    cmdCenter.addCommand(createCustomCommand('joe', ActionFactory.sendMessageAction('Mamma'), 'Tells a joke'));
    cmdCenter.addCommand(createCustomCommand(['thots', 'thotlist'], ActionFactory.sendListAction(thotlist, 'Thots List (TM)', 'Miguel'), 'Sends thot ranking list'));
    cmdCenter.addCommand(createCustomCommand('edgelist', ActionFactory.sendListAction(edgelist, 'Edge List', 'Miguel'), 'Sends edge ranking list'));
    cmdCenter.addCommand(createCustomCommand(['peenerlist', 'penislist', 'peeners'], ActionFactory.sendListAction(peenerlist, 'Peener List', 'Miguel'), 'Sends the peener ranking list'));
    cmdCenter.addCommand(createCustomCommand(['ejaculations', 'ejaculationlist', 'nutlist', 'fastestnut', 'fastestnutinthewest'], ActionFactory.sendListAction(nutlist, 'Fastest Ejaculation List', 'Miguel'), 'Sends fastest ejaculation rankings'));

    cmdCenter.addCommand(createCustomCommand(['yare', 'yareyare', 'yareyaredaze'], ActionFactory.sendFileAction('./imgs/yare.png'), 'Yare Yare Daze'));
    cmdCenter.addCommand(createCustomCommand('settle', ActionFactory.sendFileAction('./imgs/settle.png'), 'Settles everyone'));
    cmdCenter.addCommand(createCustomCommand('settlehot', ActionFactory.sendFileAction('./imgs/settle-hot.png'), 'Settles everyone hotly'));
    cmdCenter.addCommand(createCustomCommand('kenpog', ActionFactory.sendFileAction('./imgs/kenpog.jpg'), 'Shows just how much a pogchamp Ken really is'));
    cmdCenter.addCommand(createCustomCommand('kenpog2', ActionFactory.sendFileAction('./imgs/kenpog2.jpg'), 'Shows just how much a pogchamp Ken really is a second time'));
    cmdCenter.addCommand(createCustomCommand('kenyounot', ActionFactory.sendFileAction('./imgs/kenyounot.png'), 'Shows just how much a pogchamp Ken really is a second time'));
    cmdCenter.addCommand(createCustomCommand('settlehotold', ActionFactory.sendFileAction('./imgs/settle-hot-old.png'), 'Settles everyone hotly the old-fasioned way'));

    cmdCenter.addCommand(createCustomCommand('degree', ActionFactory.sendMessageAction('°'), '°'));
    cmdCenter.addCommand(createCustomCommand(['jesus', 'jesusfish', 'alpha'], ActionFactory.sendMessageAction('α'), 'α'));
    cmdCenter.addCommand(createCustomCommand('beta', ActionFactory.sendMessageAction('β'), 'β'));
    cmdCenter.addCommand(createCustomCommand('lambda', ActionFactory.sendMessageAction('λ'), 'λ'));
    cmdCenter.addCommand(createCustomCommand('integral', ActionFactory.sendMessageAction('∫'), '∫'));
    cmdCenter.addCommand(createCustomCommand('infinity', ActionFactory.sendMessageAction('∞'), '∞'));
    cmdCenter.addCommand(createCustomCommand('sigma', ActionFactory.sendMessageAction(':ok_hand: :eggplant: :sweat_drops: or Σ / σ'), 'Σ / σ'));
    cmdCenter.addCommand(createCustomCommand(['giveortake', 'plusorminus', 'minusplus', 'plusminus'], ActionFactory.sendMessageAction('±'), '±'));
    cmdCenter.addCommand(createCustomCommand('greekquestionmark', ActionFactory.sendMessageAction(';'), ';'));
    cmdCenter.addCommand(createCustomCommand('mu', ActionFactory.sendMessageAction('µ'), 'µ'));
    cmdCenter.addCommand(createCustomCommand('omega', ActionFactory.sendMessageAction('ω'), 'ω'));
    cmdCenter.addCommand(createCustomCommand('pi', ActionFactory.sendMessageAction('π'), 'π'));
    cmdCenter.addCommand(createCustomCommand('phi', ActionFactory.sendMessageAction('φ'), 'φ'));
    cmdCenter.addCommand(createCustomCommand(['allrealnum', 'realnums', 'allrealnums'], ActionFactory.sendMessageAction('ℝ'), 'ℝ'));
    cmdCenter.addCommand(createCustomCommand(['density', 'rho', 'row'], ActionFactory.sendMessageAction('ρ'), 'ρ'));
    cmdCenter.addCommand(createCustomCommand('github', ActionFactory.sendMessageAction('https://github.com/AnthonyTornetta/COW-Bot'), 'Sends the GitHub page for the COW Bot'));
}

function createCustomCommand(name, action, desc)
{
    return new (class extends CustomCommand
    {
        constructor()
        {
            super(name, desc);

            this.action = action;
        }
    })();
}