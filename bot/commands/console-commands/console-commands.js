const Announce = require('./announce');
const Kick = require('./kick');
const Ping = require('./ping');
const Restart = require('./restart');
const Say = require('./say');
const Stop = require('./stop');

/**
 * 
 * @param {CommandCenter} cmdCenter 
 */
module.exports = function addAllCommands(cmdCenter)
{
    cmdCenter.addCommand(new Announce());
    cmdCenter.addCommand(new Kick());
    cmdCenter.addCommand(new Ping());
    cmdCenter.addCommand(new Restart());
    cmdCenter.addCommand(new Say());
    cmdCenter.addCommand(new Stop());
}