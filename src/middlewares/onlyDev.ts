import { createMiddleware } from "seyfert";
const DEVS = process.env.DISCORD_DEVS_IDS?.split(",") || [];

export default createMiddleware<void>(({ next, stop, context }) => {
  if (!DEVS.includes(context.author.id))
    stop("Only devs are allowed to use this command");

  next();
});
