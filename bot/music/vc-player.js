import Song from "./song.js";
import DiscordUtils from "../discord-utils.js";
import ytdl from "ytdl-core";
import ytProxy from "./youtube-proxy.js";

export default class VCPlayer {
  constructor(vc, txtChannel) {
    this.songs = [];

    this.vc = vc;
    this.dispatcher = null;
    this.txtChannel = txtChannel;
    this.playing = null;
    this.autoplay = false;

    this.timeout = null;
  }

  playNext() {
    if (this.songs.length === 0) {
      if (this.shouldAutoplay()) {
        this.playAutoplay();
        return;
      } else {
        global.musicBotManager.stop(this.txtChannel);
        return;
      }
    }

    let song = this.songs[0];
    for (let i = 1; i < this.songs.length; i++) {
      this.songs[i - 1] = this.songs[i];
    }
    this.songs.length--;

    this.vc
      .join()
      .then((con) => {
        DiscordUtils.send(`:arrow_forward: ${song.format()}`, this.txtChannel);

        this.playing = song;
        this.dispatcher = con.playStream(ytdl(song.url));

        this.timeout = setTimeout(() => {
          this.playNext();

          this.playing = null;
        }, song.duration * 1000);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  start() {
    this.playNext();
  }

  shouldAutoplay() {
    return this.autoplay && this.playing && this.vc.members.size > 1;
  }

  playAutoplay() {
    ytProxy.relatedVideos(this.playing.url, (res) => {
      let selected = res[~~(Math.random() * Math.min(3, res.length))];

      ytProxy.videoInfo(
        `https://www.youtube.com/watch?v=${selected.id}`,
        (res) => {
          this.addSong(
            new Song(
              res.videoDetails.title,
              res.videoDetails.author.name,
              res.videoDetails.lengthSeconds,
              res.videoDetails.video_url
            )
          );

          this.playNext();
        }
      );
    });
  }

  skip() {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    if (this.songs.length == 0) {
      if (this.shouldAutoplay()) {
        this.playAutoplay();
        return false;
      } else {
        this.stop();
        return true;
      }
    } else {
      this.playNext();
      return false;
    }
  }

  stop() {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    this.playing = null;
    this.dispatcher = null;
    this.vc.leave();
    this.songs = [];
  }

  addSong(s) {
    this.songs.push(s);
  }
}
