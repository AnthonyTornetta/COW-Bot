module.exports = 
{
    send: (msg, channel) =>
    {
        channel.send(msg).catch(ex => console.log(ex));
    },

    sendFile: (file, channel) =>
    {
        channel.send({files: [file]});
    },

    getMentioned: (msg) =>
    {
        let mentioned = [];
        msg.mentions.users.forEach(val => mentioned.push(val));
        return mentioned;
    },

    /**
     * 
     * @param {GuildUser} member 
     * @param {string} reason 
     * @param {Channel} channel 
     */
    kick: (member, reason, channel) =>
    {
        if (member.kickable)
        {
            channel.createInvite(
            { temporary: false, maxAge: 0, maxUses: 100, unique: false, reasons: 'Reinviting a blasphemer' }, 'Reinviting a blasphemer').then(invite =>
                {
                    channel.send(`<@${member.id}> has been kicked for ${reason}.`);
                    member.send(`You have been kicked from the server for ${reason}. Once you have learned your lesson, use the invite link here: https://discord.gg/${invite.code}`).then(() =>
                    {
                        member.kick(reason);
                    });
                }).catch(err =>
                {
                    channel.send(`<@${member.id}> - **YOU HAVE BEEN GRANTED MERCY FOR YOUR BLASPHEMY. NEXT TIME, YOU MAY NOT BE SO LUCKY!**`);
                    logger.info(err);
                });
        }
        else
            channel.send(`<@${member.id}> - **Due to your status in the Church of Wind, your blasphemy has been forgiven. Be more careful next time.**`);
    }
}