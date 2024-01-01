import Discord from "discord.js";
import winston from "winston";
import auth from "./auth.json" with { type: "json" };

import DiscordUtils from "./bot/discord-utils.js";

import CommandCenter from "./bot/command-center.js";

const consoleCommandCenter = new CommandCenter();
const discordCommandCenter = new CommandCenter();

import registerConsoleCommands from "./bot/commands/console-commands/console-commands.js";
registerConsoleCommands(consoleCommandCenter);

import registerDiscordCommands from "./bot/commands/discord-commands/discord-commands.js";
registerDiscordCommands(discordCommandCenter);

import MusicBotManager from "./bot/music/music-bot-manager.js";

global.musicBotManager = new MusicBotManager();

import rl from "readline";

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new Discord.Client();

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

let running = true;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  (function promptCommand() {
    readline.question("> ", (res) => {
      running = handleConsoleCommand(res);
      if (running) promptCommand();
      else {
        console.log("Exiting...");
        process.exit();
      }
    });
  })();
});

/**
 * Handles a command given in through the console
 * @param {string} cmd
 */
function handleConsoleCommand(cmd) {
  let split = cmd.split(" ");
  let command = split[0].toLowerCase();

  const cmdObj = consoleCommandCenter.commandFromName(command);
  if (cmdObj) return cmdObj.action(client, split, cmd, command);
  else {
    console.log("Invalid command.");
    return true;
  }
}

client.on("message", (msg) => {
  if (msg.content.charAt(0) == "?") {
    const msgRaw = msg.content.substring(1);

    let split = msgRaw.split(" ");

    const cmd = split[0].toLowerCase();

    const cmdObj = discordCommandCenter.commandFromName(cmd);
    if (cmdObj) cmdObj.action(msg, discordCommandCenter);
  }

  if (msg.content.toLocaleLowerCase().includes("gravity")) {
    msg.guild.fetchMember(msg.author).then((member) => {
      DiscordUtils.kick(member, "blasphemy", msg.channel);
    });
  }
});

client.login(auth.token);

client.on("error", () => {
  console.log("Some random error just occurred.");
});

// https://discordapp.com/oauth2/authorize?client_id=518474890614145067&scope=bot&permissions=8
