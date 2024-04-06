import { createEvent } from "seyfert";

export default createEvent({
  data: { name: "guildCreate" },
  async run(guild, client) {
    if (!guild) return;

    client.logger.info(
      `Joined ${guild.name} (${guild.id}) with ${guild.memberCount} members`
    );

    client.saveNoExistData({
      client: client,
      event: "guildCreate",
      data: guild,
    });
  },
});
