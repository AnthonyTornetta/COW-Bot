const ytProxy = require('../../../bot/music/youtube-proxy');

const CustomCommand = require('../custom-command');
const DiscordUtils = require('../../discord-utils');

const YT_URL = 'https://www.youtube.com/';

const Song = require('../../music/song');

module.exports = class Play extends CustomCommand
{
    constructor()
    {
        super(['play', 'p'], 'COW bot plays the song in the voice channel you\'re in.');
    }

    action(msg)
    {
        if(!msg.member.voiceChannelID)
        {
            DiscordUtils.send('Must be in a voice channel to use this command!  If you are in a voice channel, try rejoining.', msg.channel);
            return;
        }

        let vc = msg.guild.channels.get(msg.member.voiceChannelID);

        let split = msg.content.split(' ');
        if(split.length === 1)
        {
            DiscordUtils.send('Usage: ?play [url/youtube search]', msg.channel);
            return;
        }
        
        let isURL = split.length === 2 && 
            split[1].substr(0, YT_URL.length).toLowerCase() === YT_URL;

        if(isURL)
        {
            ytProxy.videoInfo(split[1], (res) =>
            {
                handleURL(vc, msg, res);
            });
        }
        else
        {
            ytProxy.search(msg.content.substr(split[0].length + 1), (err, res) =>
            {
                if(err)
                    DiscordUtils.send(err, msg.channel);
                else if(res == null)
                    DiscordUtils.send('Unable to find a video matching that name :(', msg.channel);
                else
                {
                    ytProxy.videoInfo(res.id, (res) =>
                    {
                        handleURL(vc, msg, res);
                    });
                }
            });
        }
    }
};

function handleURL(vc, msg, res)
{
    global.musicBotManager.addSong(vc, msg.channel, new Song(
        res.videoDetails.title, res.videoDetails.author.name, res.videoDetails.lengthSeconds, res.videoDetails.video_url));
}