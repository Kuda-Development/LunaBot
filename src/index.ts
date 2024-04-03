/**
 * This is the main entrypoint for the bot.
 * @author EddyerDev
 * @license MIT
 * @version 1.0
 */

import { Client } from "seyfert";
import * as dotenv from "dotenv";
dotenv.config();

const client = new Client({});
client.start().then(() => client.uploadCommands());
