export default class CommandCenter {
  constructor() {
    this.commands = [];
  }

  /**
   *
   * @param {CustomCommand} cmd
   */
  addCommand(cmd) {
    this.commands.push(cmd);
  }

  /**
   *
   * @param {string} name
   */
  commandFromName(name) {
    for (let i = 0; i < this.commands.length; i++) {
      let cmd = this.commands[i];

      for (let j = 0; j < cmd.name.length; j++) {
        if (cmd.name[j] === name) return cmd;
      }
    }

    return undefined;
  }
}
