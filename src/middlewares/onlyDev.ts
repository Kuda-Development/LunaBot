import { createMiddleware } from "seyfert";
const DEVS = process.env.DISCORD_DEVS_IDS?.split(",") || [];

export default createMiddleware<void>((middle) => {
  if (!DEVS.includes(middle.context.author.id))
    middle.stop("Only devs are allowed to use this command");

  middle.next();
});
