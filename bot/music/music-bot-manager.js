import VCPlayer from "./vc-player.js";
import DiscordUtils from "../discord-utils.js";

function format(title, author, duration) {
  return `${title} - ${author} (${~~(duration / 60)}:${
    duration % 60 < 10 ? `0${duration % 60}` : duration % 60
  })`;
}

export default class MusicBotManager {
  constructor() {
    this.vcPlayers = {};
  }

  addSong(vc, txtChannel, song) {
    if (!this.vcPlayers[vc.guild.id]) {
      this.vcPlayers[vc.guild.id] = new VCPlayer(vc, txtChannel);
    }

    DiscordUtils.send("Adding: " + song.format(), txtChannel);

    this.vcPlayers[vc.guild.id].txtChannel = txtChannel; // keeps it updated

    this.vcPlayers[vc.guild.id].addSong(song);

    let listStr = `Upcoming Songs\n\`\`\`css\n`;
    for (let i = 0; i < this.vcPlayers[vc.guild.id].songs.length; i++) {
      let song = this.vcPlayers[vc.guild.id].songs[i];

      listStr += `${i + 1}: ${format(song.name, song.author, song.duration)}\n`;
    }
    listStr += "```";

    DiscordUtils.send(listStr, txtChannel);

    if (!this.vcPlayers[vc.guild.id].playing)
      this.vcPlayers[vc.guild.id].start();
  }

  skip(txtChannel, callback) {
    if (this.vcPlayers[txtChannel.guild.id]) {
      if (this.vcPlayers[txtChannel.guild.id].skip()) {
        this.vcPlayers[txtChannel.guild.id] = undefined;

        if (callback) callback(undefined, "leave");
      } else {
        if (callback) callback(undefined, "skip");
      }
    } else callback("I'm not in a voice channel.");
  }

  stop(txtChannel) {
    if (this.vcPlayers[txtChannel.guild.id]) {
      this.vcPlayers[txtChannel.guild.id].stop();
      this.vcPlayers[txtChannel.guild.id] = null;
      return true;
    }
    return false;
  }

  autoplay(txtChannel, callback) {
    if (this.vcPlayers[txtChannel.guild.id]) {
      let bot = this.vcPlayers[txtChannel.guild.id];
      bot.autoplay = !bot.autoplay;

      callback(undefined, bot.autoplay);
    } else if (callback) callback("Bot not in a voice channel.");
  }
}
