import { stripIndent } from "common-tags";
import { ButtonStyle } from "discord-api-types/v10";
import {
  type CommandContext,
  Declare,
  SubCommand,
  Embed,
  ActionRow,
  Button,
} from "seyfert";

@Declare({
  name: "tickets",
  description: "Setup the ticket system for your server",
})
export default class TicketsCommand extends SubCommand {
  async run(ctx: CommandContext<{}>) {
    const member = ctx.message ? ctx.message.member : ctx.interaction?.member;
    const data = await ctx.client.prisma.guildTicketSystem.findFirst({
      where: {
        guild_id: {
          equals: ctx.guildId,
        },
      },
    });

    const embedInitial = new Embed()
      .setAuthor({
        iconUrl: member?.avatarURL(),
        name: `Hi ${ctx.author.username}`,
      })
      .setColor(`#${process.env.DISCORD_EMBED_COLOR}`)
      .setDescription(stripIndent`
        Welcome to the setup of the tickets system!

        > This system has been **${data?.enabled ? "enabled" : "disabled"}**!
      `);

    const componentsInitial = new ActionRow<Button>().addComponents(
      new Button()
        .setCustomId("enable-tickets-system")
        .setLabel("Enable")
        .setDisabled(data?.enabled)
        .setStyle(ButtonStyle.Secondary),
      new Button()
        .setCustomId("disable-tickets-system")
        .setLabel("Disable")
        .setDisabled(!data?.enabled)
        .setStyle(ButtonStyle.Secondary),
      new Button()
        .setCustomId("config-tickets-system")
        .setLabel("Config")
        .setDisabled(!data?.enabled)
        .setStyle(ButtonStyle.Secondary)
    );

    return await ctx.write({
      embeds: [embedInitial],
      components: [componentsInitial],
    });
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
