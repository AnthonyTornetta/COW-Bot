const ytProxy = require('../../../bot/music/youtube-proxy');

const CustomCommand = require('../custom-command');
const DiscordUtils = require('../../discord-utils');

const Song = require('../../music/song');

// https://stackoverflow.com/questions/28735459/how-to-validate-youtube-url-in-client-side-in-text-box
function isYTUrl(url)
{
    const p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return url.match(p) && url.match(p)[1];
}

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

        if(isYTUrl(split[1]))
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
                    ytProxy.videoInfo(res.link, (res) =>
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