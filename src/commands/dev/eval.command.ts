import { stripIndent } from "common-tags";
import {
  type CommandContext,
  Declare,
  SubCommand,
  Middlewares,
  Embed,
} from "seyfert";

@Declare({
  name: "eval",
  description: "This command evaluates code for only devs",
})
// @ts-ignore
@Middlewares(["onlyDev", "inDev"])
export default class EvalCommand extends SubCommand {
  async run() {}

  async onMiddlewaresError(ctx: CommandContext<{}, never>, error: string) {
    const member = ctx.message ? ctx.message.member : ctx.interaction?.member;

    return await ctx.write({
      embeds: [
        new Embed()
          .setAuthor({
            iconUrl: member?.avatarURL(),
            name: `Hi ${ctx.author.username}`,
          })
          .setColor(`#${process.env.DISCORD_EMBED_COLOR}`)
          .setDescription(stripIndent`
            > Oh no, something went wrong! 
            > **${error}**`),
      ],
    });
  }
}
