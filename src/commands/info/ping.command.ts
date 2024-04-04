import {
  type CommandContext,
  createBooleanOption,
  Declare,
  Options,
  Embed,
  SubCommand,
} from "seyfert";
import { ColorResolvable } from "seyfert/lib/common";
import { MessageFlags } from "discord-api-types/v10";
import { stripIndent } from "common-tags";

const options = {
  hide: createBooleanOption({
    name: "hide",
    description: "Hide the embed",
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

    await ctx.write({
      embeds: [
        new Embed()
          .setAuthor({
            iconUrl: ctx.client.me.avatarURL(),
            name: `Hi ${ctx.author.username}`,
          })
          .setColor(process.env.DISCORD_EMBED_COLOR as ColorResolvable)
          .setDescription(stripIndent`> My latency is **${ping}ms**`),
      ],
      flags: flags,
    });
  }
}
