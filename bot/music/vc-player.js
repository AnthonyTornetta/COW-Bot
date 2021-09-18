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

        this.timeout = null;
    }

    playNext()
    {
        if(this.songs.length === 0)
        {
            global.musicBotManager.stop(this.txtChannel);
            return;
        }
        
        let song = this.songs[0];
        for(let i = 1; i < this.songs.length; i++)
        {
            this.songs[i - 1] = this.songs[i];
        }
        this.songs.length--;

        this.vc.join().then(con =>
        {
            DiscordUtils.send(`:arrow_forward: ${song.format()}`, this.txtChannel);

            this.dispatcher = con.playStream(ytdl(song.url));

            this.timeout = setTimeout(() =>
            {
                this.playNext();
            }, song.duration * 1000);
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
        if(this.timeout !== null)
        {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if(this.songs.length == 0)
        {
            this.stop();
            return true;
        }
        else
        {
            this.playNext();
            return false;
        }
    }

    stop()
    {
        if(this.timeout !== null)
        {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        this.vc.leave();
        this.songs = [];
    }

    addSong(s)
    {
        this.songs.push(s);
    }
}