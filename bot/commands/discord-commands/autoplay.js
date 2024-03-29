import CustomCommand from "../custom-command.js";
import DiscordUtils from "../../discord-utils.js";

export default class Skip extends CustomCommand {
  constructor() {
    super(
      ["autoplay", "a", "ap"],
      "COW bot autoplays the next song song based on the wind current."
    );
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

    global.musicBotManager.autoplay(msg.channel, (err, res) => {
      if (err) {
        DiscordUtils.send(err, msg.channel);
      } else {
        if (res)
          DiscordUtils.send("Autoplay Enabled :fire::fire::fire:", msg.channel);
        else
          DiscordUtils.send(
            "Autoplay Disabled :ice_cube::ice_cube::ice_cube:",
            msg.channel
          );
      }
    });
  }
}
