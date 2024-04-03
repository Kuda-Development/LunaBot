import { createEvent } from "seyfert";

export default createEvent({
  data: { name: "guildCreate" },
  async run(guild, client) {
    if (!guild) return;

    client.logger.info(
      `Joined ${guild.name} (${guild.id}) with ${guild.memberCount} members`
    );

    const guildPrefix = await client.prisma.guildPrefix.findFirst({
      where: {
        guild_id: {
          equals: guild.id,
        },
      },
    });

    const guildLang = await client.prisma.guildLang.findFirst({
      where: {
        guild_id: {
          equals: guild.id,
        },
      },
    });

    if (!guildPrefix) {
      await client.prisma.guildPrefix
        .create({
          data: {
            guild_id: guild.id,
            prefix: "lb!",
          },
        })
        .catch((err) => {
          client.logger.error(err);
        });
    } else if (!guildLang) {
      await client.prisma.guildLang
        .create({
          data: {
            guild_id: guild.id,
            lang: "en-US",
          },
        })
        .catch((err) => {
          client.logger.error(err);
        });
    }
  },
});
