import { stripIndent } from "common-tags";
import { type CommandContext, Declare, SubCommand, Embed } from "seyfert";

@Declare({
  name: "tickets",
  description: "Setup the ticket system for your server",
})
export default class TicketsCommand extends SubCommand {
  async run(ctx: CommandContext<{}>) {
    const member = ctx.message ? ctx.message.member : ctx.interaction?.member;

    const fetchData = async () =>
      await ctx.client.prisma.guildTicketSystem.findFirst({
        where: {
          guild_id: {
            equals: ctx.guildId,
          },
        },
      });

    const embed = new Embed()
      .setAuthor({
        iconUrl: member?.avatarURL(),
        name: `Hi ${ctx.author.username}`,
      })
      .setColor(`#${process.env.DISCORD_EMBED_COLOR}`);
  }

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
