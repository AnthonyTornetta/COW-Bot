const VCPlayer = require('./vc-player');
const DiscordUtils = require('../discord-utils');

function format(title, author, duration)
{
    return `${title} - ${author} (${~~(duration / 60)}:${duration % 60 < 10 ? `0${duration % 60}` : duration % 60})`;
}

module.exports = class MusicBotManager
{
    constructor()
    {
        this.vcPlayers = [];
    }

    addSong(vc, txtChannel, song)
    {
        if(!this.vcPlayers[vc.guildId])
        {
            this.vcPlayers[vc.guildId] = new VCPlayer(vc, txtChannel);
        }

        DiscordUtils.send('Adding: ' + song.format(), txtChannel);
        
        this.vcPlayers[vc.guildId].txtChannel = txtChannel; // keeps it updated

        this.vcPlayers[vc.guildId].addSong(song);
        
        let listStr = `Upcoming Songs\n\`\`\`css\n`;
        for(let i = 0; i < this.vcPlayers[vc.guildId].songs.length; i++)
        {
            let song = this.vcPlayers[vc.guildId].songs[i];
            
            listStr += `${i + 1}: ${format(song.name, song.author, song.duration)}\n`;
        }
        listStr += '```';

        DiscordUtils.send(listStr, txtChannel);

        if(!this.vcPlayers[vc.guildId].playing)
            this.vcPlayers[vc.guildId].start();
    }

    skip(txtChannel)
    {
        if(this.vcPlayers[txtChannel.guildId])
        {
            DiscordUtils.send(':fast_forward:', txtChannel);
            this.vcPlayers[txtChannel.guildId].skip();
            return true;
        }
        return false;
    }
    
    stop(txtChannel)
    {
        if(this.vcPlayers[txtChannel.guildId])
        {
            DiscordUtils.send(':wave:', txtChannel);
            this.vcPlayers[txtChannel.guildId].stop();
            this.vcPlayers[txtChannel.guildId] = null;
            return true;
        }
        return false;
    }
}