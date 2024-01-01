import CustomCommand from "../custom-command.js";
import DiscordUtils from "../../discord-utils.js";

export default class Help extends CustomCommand {
  constructor() {
    super("help", "COW bot helps you out.");
  }

  action(msg, commandCenter) {
    let list = "== COW Bot Commands ==\n```yml\n";

    for (let i = 0; i < commandCenter.commands.length; i++) {
      let cc = commandCenter.commands[i];
      let names = "";

      cc.name.forEach((name) => {
        names += name + " ";
      });

      names = names.substr(0, names.length - 1);

      list += `${names}: ${cc.description}\n`;
    }

    list += "```";
    DiscordUtils.send(list, msg.channel);
  }
}
