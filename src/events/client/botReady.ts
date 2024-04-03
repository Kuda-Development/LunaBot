import { createEvent } from "seyfert";

export default createEvent({
  data: { once: true, name: "botReady" },
  async run(user, client) {
    client.logger.info(
      `Logged in as ${user.username} (${
        user.id
      }) in ${client.cache.guilds!.count()} servers`
    );

    client.prisma.$connect().then(() => {
      client.logger.info("Connected to Prisma with provider MongoDB");
    });
  },
});
