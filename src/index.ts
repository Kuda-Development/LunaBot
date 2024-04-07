/**
 * This is the main entrypoint for the bot.
 * @author EddyerDev
 * @license MIT
 * @version 1.0
 */

import { Client } from "seyfert";
import { PrismaClient } from "@prisma/client";
import { middlewares } from "./middlewares";
import * as dotenv from "dotenv";
import saveNoExistData from "./utils/saveNoExistData";
dotenv.config();

const prisma = new PrismaClient();
const client = new Client({
  commands: {
    prefix: async (message) => {
      if (!message.guildId || message.author.bot) return ["lb!"];
      const prefixGuild = await message.client.prisma.guildPrefix.findUnique({
        where: {
          guild_id: message.guildId,
        },
      });
      if (!prefixGuild) return ["lb!"];
      return [prefixGuild.prefix ?? "lb!"];
    },
    reply: () => false,
    deferReplyResponse: () => ({ content: "Writing..." }),
  },
});

client.prisma = prisma;
client.saveNoExistData = saveNoExistData;
client.setServices({
  middlewares: middlewares,
});
client.start().then(async () => {
  await client.uploadCommands();
});
