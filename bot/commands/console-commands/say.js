import CustomCommand from "../custom-command.js";

export default class Say extends CustomCommand {
  constructor() {
    super("say", "Says something to every server.");
  }

  action(client, split, cmd, command) {
    if (split.length > 1) {
      client.guilds.forEach((g) => {
        let c = g.channels.filter((channel) => {
          return channel.name === "general" && channel.type === "text";
        });

        c.forEach((channel) => {
          send(cmd.substr(command.length), channel);
        });
      });
    } else console.log("Must specify what to send!");

    return true;
  }
}
