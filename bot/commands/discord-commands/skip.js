import CustomCommand from "../custom-command.js";
import DiscordUtils from "../../discord-utils.js";

export default class Skip extends CustomCommand {
  constructor() {
    super(["skip", "s"], "COW bot skips the current song.");
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

    global.musicBotManager.skip(msg.channel, (err, res) => {
      if (err) DiscordUtils.send(err, msg.channel);
      else {
        if (res === "leave") {
          DiscordUtils.send(":wave:", msg.channel);
        } else if (res === "skip") {
          DiscordUtils.send(":fast_forward:", msg.channel);
        }
      }
    });
  }
}
