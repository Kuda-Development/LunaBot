import { stripIndent } from "common-tags";
import {
  type CommandContext,
  Declare,
  SubCommand,
  Middlewares,
  Embed,
} from "seyfert";
import { ColorResolvable } from "seyfert/lib/common";

@Declare({
  name: "eval",
  description: "This command evaluates code for only devs",
})
// @ts-ignore
@Middlewares(["onlyDev"])
export default class EvalCommand extends SubCommand {
  async run(ctx: CommandContext) {
    ctx.write({
      content: "test sub commands",
    });
  }

  async onMiddlewaresError(ctx: CommandContext<{}, never>, error: string) {
    return await ctx.write({
      embeds: [
        new Embed()
          .setAuthor({
            iconUrl: ctx.client.me.avatarURL(),
            name: `Hi ${ctx.author.username}`,
          })
          .setColor(process.env.DISCORD_EMBED_COLOR as ColorResolvable)
          .setDescription(stripIndent`
            > Oh no, something went wrong! 
            > \`${error}\``),
      ],
    });
  }
}
