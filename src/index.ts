/**
 * This is the main entrypoint for the bot.
 * @author EddyerDev
 * @license MIT
 * @version 1.0
 */

import { Client } from "seyfert";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();
const client = new Client({});

client.prisma = prisma;
client.start().then(() => client.uploadCommands());
