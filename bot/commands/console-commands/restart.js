import CustomCommand from "../custom-command.js";

import auth from "../../../auth.json" with { type: "json" };

export default class Restart extends CustomCommand {
  constructor() {
    super("restart", "Logs out then logs back in.");
  }

  action(client) {
    client.destroy();
    client.login(auth.token);
    console.log("Restarted!");
    return true;
  }
}
