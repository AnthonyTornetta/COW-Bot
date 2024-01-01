import Announce from "./announce.js";
import Kick from "./kick.js";
import Ping from "./ping.js";
import Restart from "./restart.js";
import Say from "./say.js";
import Stop from "./stop.js";

/**
 *
 * @param {CommandCenter} cmdCenter
 */
export default function addAllCommands(cmdCenter) {
  cmdCenter.addCommand(new Announce());
  cmdCenter.addCommand(new Kick());
  cmdCenter.addCommand(new Ping());
  cmdCenter.addCommand(new Restart());
  cmdCenter.addCommand(new Say());
  cmdCenter.addCommand(new Stop());
}
