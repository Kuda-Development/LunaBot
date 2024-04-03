import { createEvent } from "seyfert";

export default createEvent({
  data: { name: "guildCreate" },
  async run(guild, client) {
    if (!guild) return;

    client.logger.info(
      `Joined ${guild.name} (${guild.id}) with ${guild.memberCount} members`
    );

    const guildPrefix = await client.prisma.guildPrefix.create({
      data: {
        guildId: guild.id,
        prefix: "lb!",
      },
    });

    if (guildPrefix)
      client.logger.info(`Has been created guild prefix to ${guild.id}`);
    else client.logger.error(`Failed to create guild prefix to ${guild.id}`);
  },
});
