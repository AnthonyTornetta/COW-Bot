import CustomCommand from "../custom-command.js";
import DiscordUtils from "../../discord-utils.js";

export default class Proud extends CustomCommand {
  constructor() {
    super("proud", "COW bot is proud of [name(s)]");
  }

  action(msg) {
    let mentioned = DiscordUtils.getMentioned(msg);

    if (mentioned.length === 0)
      DiscordUtils.send("COW bot is proud of @everyone.", msg.channel);
    else if (mentioned.length === 1)
      DiscordUtils.send(
        `COW bot is proud of you <@${mentioned[0].id}>.`,
        msg.channel
      );
    else {
      let message = "COW bot is very proud of ";

      for (let i = 0; i < mentioned.length; i++) {
        if (i + 1 === mentioned.length && mentioned.length !== 2)
          message += "and ";

        message += `<@${mentioned[i].id}>`;

        if (i + 1 === mentioned.length) message += ".";
        else message += ", ";
      }

      if (message.length > 2000)
        DiscordUtils.send("COW bot is very proud.", msg.channel);
      else DiscordUtils.send(message, msg.channel);
    }
  }
}
