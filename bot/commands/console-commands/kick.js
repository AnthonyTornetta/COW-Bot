import CustomCommand from "../custom-command.js";

export default class Kick extends CustomCommand {
  constructor() {
    super("kick", "UNTESTED!!! Kicks a specified person.");
  }

  action(client, split) {
    if (split.length > 1) {
      let memberFound = false;

      client.guilds.cache.forEach((g) => {
        g.fetchMembers();

        g.members.cache.forEach((m) => {
          console.log(m.user.tag);
          if (m.user.tag === split[1]) {
            memberFound = true;
            g.kick(
              m,
              split.length > 2 ? split[2] : "blaspheming",
              g.channels.find((c) => c.name === "general")
            );
          }
        });
      });

      if (!memberFound) {
        console.log(
          "No member by that name was found - make sure to format it like name#0000"
        );
      }
    } else {
      console.log("You must provide the name + numbers!");
    }

    return true;
  }
}
