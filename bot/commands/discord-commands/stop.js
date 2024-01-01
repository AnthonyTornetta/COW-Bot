import CustomCommand from "../custom-command.js";
import DiscordUtils from "../../discord-utils.js";

export default class Stop extends CustomCommand {
  constructor() {
    super("stop", "COW bot leaves the voice call.");
  }

  action(msg) {
    const vc = msg.member.voice.channel;
    if (!vc) {
      DiscordUtils.send(
        "Must be in the voice channel to use this command!",
        msg.channel
      );
      return;
    }

    if (global.musicBotManager.stop(msg.channel)) {
      DiscordUtils.send(":wave:", msg.channel);
    } else {
      DiscordUtils.send("I'm not in a voice call.", msg.channel);
    }
  }
}
