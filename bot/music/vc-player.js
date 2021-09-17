const Song = require('./song');
const DiscordUtils = require('../discord-utils');
const ytdl = require('ytdl-core');

module.exports = class VCPlayer
{
    constructor(vc, txtChannel)
    {
        this.songs = [];

        this.vc = vc;
        this.dispatcher = null;
        this.txtChannel = txtChannel;
        this.playing = false;
    }

    playNext()
    {
        if(this.songs.length === 0)
            return;

        let song = this.songs[0];
        for(let i = 1; i < this.songs.length; i++)
        {
            songs[i - 1] = songs[i];
        }
        this.songs.length--;

        this.vc.join().then(con =>
        {
            DiscordUtils.send(`:arrow_forward: ${song.format()}`, this.txtChannel);

            this.dispatcher = con.playStream(ytdl(song.url));
            this.dispatcher.on("finish", end =>
            {
                this.playNext();
            });
        }).catch(e =>
        {
            console.error(e);
        });
    }

    start()
    {
        this.playNext();
        this.playing = true;
    }

    skip()
    {
        if(this.songs.length == 0)
            this.stop();
        else
            this.playNext();
    }

    stop()
    {
        this.vc.leave();
        this.songs = [];
    }

    addSong(s)
    {
        this.songs.push(s);
    }
}