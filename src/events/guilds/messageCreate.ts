import { createEvent } from "seyfert";

export default createEvent({
  data: { name: "messageCreate" },
  async run(message, client) {
    client.saveNoExistData({
      client: client,
      event: "messageCreate",
      data: message,
    });
  },
});
