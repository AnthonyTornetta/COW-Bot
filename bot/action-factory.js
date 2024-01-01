import DiscordUtils from "./discord-utils.js";

export default {
  sendMessageAction: (msg) => {
    return (msgSent) => {
      DiscordUtils.send(msg, msgSent.channel);
    };
  },

  sendFileAction: (file) => {
    return (msg) => {
      DiscordUtils.sendFile(file, msg.channel);
    };
  },

  sendListAction: (list, listName, by) => {
    let listStr = `${listName} by ${by}:\n\`\`\`css\n`;
    for (let i = 0; i < list.length; i++) {
      listStr += `${i + 1}: ${list[i]}\n`;
    }
    listStr += "```";

    return (msg) => {
      DiscordUtils.send(listStr, msg.channel);
    };
  },
};
