import {
  type CommandContext,
  createBooleanOption,
  Declare,
  Options,
  Embed,
  SubCommand,
} from "seyfert";
import { MessageFlags } from "discord-api-types/v10";
import { stripIndent } from "common-tags";

const options = {
  hide: createBooleanOption({
    description: "Hide the message",
    required: false,
  }),
};

@Declare({
  name: "ping",
  description: "Ping of the bot",
  botPermissions: ["SendMessages"],
  defaultMemberPermissions: ["SendMessages"],
})
@Options(options)
export default class PingCommand extends SubCommand {
  async run(ctx: CommandContext<typeof options>) {
    const hide = ctx.options.hide ?? false;
    const ping = ctx.client.gateway.latency;
    const flags = hide ? MessageFlags.Ephemeral : undefined;
    const member = ctx.message ? ctx.message.member : ctx.interaction?.member;

    const embed = new Embed()
      .setAuthor({
        iconUrl: member?.user.avatarURL(),
        name: `Hi ${ctx.author.username}`,
      })
      .setColor(`#${process.env.DISCORD_EMBED_COLOR}`);

    if (ctx.message && hide)
      return await ctx.write({
        embeds: [
          embed.setDescription(stripIndent`
          > My latency is **${ping}ms**
          
          > The option "hide" not works in prefix commands.`),
        ],
      });

    await ctx.write({
      embeds: [
        embed.setDescription(stripIndent`> My latency is **${ping}ms**`),
      ],
      flags: flags,
    });
  }
}
