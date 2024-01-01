import CustomCommand from "../custom-command.js";
import DiscordUtils from "../../discord-utils.js";

export default class Coinflip extends CustomCommand {
  constructor() {
    super(["coinflip", "flipcoin"], "COW bot flips a coin.");
  }

  action(msg) {
    DiscordUtils.send(Math.random() < 0.5 ? "Heads" : "Tails", msg.channel);
  }
}
