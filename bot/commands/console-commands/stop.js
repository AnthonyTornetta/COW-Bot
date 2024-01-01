import CustomCommand from "../custom-command.js";

export default class Stop extends CustomCommand {
  constructor() {
    super("stop", "Exits the bot.");
  }

  action(client) {
    client.destroy();
    return false;
  }
}
