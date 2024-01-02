import Song from "./song.js";
import DiscordUtils from "../discord-utils.js";
import play from "play-dl"; // Individual functions
import ytProxy from "./youtube-proxy.js";

import {
  NoSubscriberBehavior,
  StreamType,
  createAudioPlayer,
  createAudioResource,
  entersState,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  joinVoiceChannel,
} from "@discordjs/voice";

async function connectToChannel(channel) {
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });
  try {
    await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
    return connection;
  } catch (error) {
    connection.destroy();
    throw error;
  }
}

export default class VCPlayer {
  constructor(vc, txtChannel) {
    this.songs = [];

    this.vc = vc;
    this.txtChannel = txtChannel;
    this.playing = null;
    this.autoplay = false;

    this.player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Play,
        maxMissedFrames: 5,
      },
    });

    connectToChannel(this.vc)
      .then((con) => {
        this.connection = con;
        con.subscribe(this.player);
      })
      .catch((e) => {
        console.error(e);
      });

    this.player.on("stateChange", (oldState, newState) => {
      if (newState.status === AudioPlayerStatus.Idle) {
        if (this.playing) {
          this.playNext();
        }
      }
    });
  }

  async playNext() {
    if (this.songs.length === 0) {
      if (this.shouldAutoplay()) {
        this.playAutoplay();
        return;
      } else {
        global.musicBotManager.stop(this.txtChannel);
        return;
      }
    }

    const song = this.songs.splice(0, 1)[0];

    this.playing = song;

    const stream = await play.stream(song.url, {
      discordPlayerCompatibility: true,
    });

    const resource = createAudioResource(stream.stream, {
      inputType: stream.type,
    });

    this.player.play(resource);
    this.resource = resource;

    DiscordUtils.send(`:arrow_forward: ${song.format()}`, this.txtChannel);
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
    if (this.connection !== null) {
      this.connection.destroy();
    }

    this.playing = null;
    this.songs = [];
  }

  addSong(s) {
    this.songs.push(s);
  }
}
