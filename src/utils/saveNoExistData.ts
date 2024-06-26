import { UsingClient } from "seyfert";

export interface SaveNoExistDataProps {
  client: UsingClient;
  event: "guildCreate" | "interactionCreate" | "messageCreate";
  data: any;
}

export default async ({
  client,
  event,
  data,
}: SaveNoExistDataProps): Promise<void> => {
  const eventingUse =
    event === "guildCreate"
      ? data.id
      : event === "messageCreate"
      ? data.guildId!
      : event === "interactionCreate"
      ? data.guildId!
      : "";

  const guildPrefix = await client.prisma.guildPrefix.findUnique({
    where: {
      guild_id: eventingUse,
    },
  });

  const guildTicketSystem = await client.prisma.guildTicketSystem.findUnique({
    where: {
      guild_id: eventingUse,
    },
  });

  if (!guildPrefix)
    await client.prisma.guildPrefix
      .create({
        data: {
          guild_id: eventingUse,
          prefix: "lb!",
        },
      })
      .catch((err) => {
        client.logger.error(err);
      });

  if (!guildTicketSystem)
    await client.prisma.guildTicketSystem
      .create({
        data: {
          guild_id: eventingUse,
          enabled: false,
          channel_id: "",
          role_id: "",
          category_id: "",
        },
      })
      .catch((err) => {
        client.logger.error(err);
      });
};
