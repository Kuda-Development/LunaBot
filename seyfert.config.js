const {
  config: { bot },
} = require("seyfert");

module.exports = bot({
  token: process.env.DISCORD_BOT_TOKEN ?? "",
  applicationId: process.env.DISCORD_APP_ID ?? "",
  intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
  locations: {
    base: "src",
    output: "dist",
    commands: "commands",
    events: "events",
  },
});
