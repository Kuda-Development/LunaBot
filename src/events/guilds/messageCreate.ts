import { createEvent } from "seyfert";

export default createEvent({
  data: { name: "messageCreate" },
  async run(message, client) {
    const guildPrefix = await client.prisma.guildPrefix.findFirst({
      where: {
        guild_id: {
          equals: message.guildId!,
        },
      },
    });

    if (!guildPrefix) {
      await client.prisma.guildPrefix
        .create({
          data: {
            guild_id: message.guildId!,
            prefix: "lb!",
          },
        })
        .catch((err) => {
          client.logger.error(err);
        });
    }
  },
});
