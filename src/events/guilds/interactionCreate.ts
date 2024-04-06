import { createEvent } from "seyfert";

export default createEvent({
  data: { name: "interactionCreate" },
  async run(interaction, client) {
    client.saveNoExistData({
      client: client,
      event: "interactionCreate",
      data: interaction,
    });
  },
});
