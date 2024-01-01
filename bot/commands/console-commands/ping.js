import CustomCommand from "../custom-command.js";

export default class Ping extends CustomCommand {
  constructor() {
    super("ping", "Says Pong.");
  }

  action() {
    console.log("Pong");

    return true;
  }
}
