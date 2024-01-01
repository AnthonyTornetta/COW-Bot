import CustomCommand from "../custom-command.js";

export default class Say extends CustomCommand {
  constructor() {
    super("say", "Says something to every server.");
  }

  action(client, split, cmd, command) {
    if (split.length > 2) {
      const serverId = split[1];
      const server = client.guilds.cache.find((g) => g.id === serverId);
      if (server) {
        const channel = server.channels.cache.find((channel) => {
          return channel.name === "general" && channel.type === 0; // 0 = text
        });

        if (channel) {
          const msg = cmd.substr(serverId.length + command.length + 2);

          channel.send(msg, channel);
          console.log("Said: " + msg);
        } else {
          console.log("Unable to find appropriate channel.");
        }
      } else {
        console.log("Server id not found - " + serverId);
      }
    } else console.log("Must specify server id & what to send!");

    return true;
  }
}
