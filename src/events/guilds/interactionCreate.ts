import { createEvent } from "seyfert";

export default createEvent({
  data: { name: "interactionCreate" },
  async run(interaction, client) {
    const guildPrefix = await client.prisma.guildPrefix.findFirst({
      where: {
        guild_id: {
          equals: interaction.guildId!,
        },
      },
    });

    if (!guildPrefix) {
      await client.prisma.guildPrefix
        .create({
          data: {
            guild_id: interaction.guildId!,
            prefix: "lb!",
          },
        })
        .catch((err) => {
          client.logger.error(err);
        });
    }
  },
});
