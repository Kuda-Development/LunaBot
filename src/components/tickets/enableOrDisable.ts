import { stripIndent } from "common-tags";
import { ButtonStyle } from "discord-api-types/v10";
import {
  ActionRow,
  Button,
  ComponentCommand,
  Embed,
  type ComponentContext,
} from "seyfert";
import wait from "../../utils/wait";

export default class HelloWorldButton extends ComponentCommand {
  componentType = "Button" as const;

  filter(ctx: ComponentContext<typeof this.componentType>) {
    return (
      ctx.customId === "enable-tickets-system" ||
      ctx.customId === "disable-tickets-system" ||
      ctx.customId === "confirm-enable-tickets-system" ||
      ctx.customId === "confirm-disable-tickets-system"
    );
  }

  async run(ctx: ComponentContext<typeof this.componentType>) {
    switch (ctx.customId) {
      case "enable-tickets-system":
      case "disable-tickets-system":
        {
          const toEnable = ctx.customId === "enable-tickets-system"!;

          await ctx.update({
            content: `Are you sure you want to **${
              toEnable ? "enable" : "disable"
            }** the tickets system?`,
            embeds: [],
            components: [
              new ActionRow<Button>().addComponents(
                new Button()
                  .setCustomId(`confirm-${ctx.customId}`)
                  .setLabel("Continue")
                  .setStyle(ButtonStyle.Danger)
              ),
            ],
          });
        }
        break;
      case `confirm-${ctx.customId.split("confirm-")[1]}`: {
        await ctx.interaction.deferUpdate();

        const toEnable =
          ctx.customId.split("confirm-")[1] === "enable-tickets-system"!;

        await ctx.client.prisma.guildTicketSystem.update({
          where: {
            guild_id: ctx.guildId,
          },
          data: {
            enabled: toEnable,
          },
        });

        const channel = await ctx.interaction.channel.fetch(true);
        if (!channel.isTextGuild()) return;
        await channel.messages.edit(ctx.interaction.message.id, {
          embeds: [],
          components: [],
          content: `The tickets system has been **${
            toEnable ? "enabled" : "disabled"
          }**!`,
        });

        wait(1000).then(async () => {
          const member = ctx.interaction.member;

          const dataUpdated =
            await ctx.client.prisma.guildTicketSystem.findUnique({
              where: {
                guild_id: ctx.guildId,
              },
            });

          if (!dataUpdated) return;

          channel.messages.edit(ctx.interaction.message.id, {
            content: null,
            embeds: [
              new Embed()
                .setAuthor({
                  iconUrl: member?.avatarURL(),
                  name: `Hi ${ctx.author.username}`,
                })
                .setColor(`#${process.env.DISCORD_EMBED_COLOR}`)
                .setDescription(stripIndent`
                  Welcome to the setup of the tickets system!

                  > This system has been **${
                    dataUpdated.enabled ? "enabled" : "disabled"
                  }**!
                `),
            ],
            components: [
              new ActionRow<Button>().addComponents(
                new Button()
                  .setCustomId("enable-tickets-system")
                  .setLabel("Enable")
                  .setDisabled(dataUpdated.enabled)
                  .setStyle(ButtonStyle.Secondary),
                new Button()
                  .setCustomId("disable-tickets-system")
                  .setLabel("Disable")
                  .setDisabled(!dataUpdated.enabled)
                  .setStyle(ButtonStyle.Secondary),
                new Button()
                  .setCustomId("config-tickets-system")
                  .setLabel("Config")
                  .setDisabled(!dataUpdated.enabled)
                  .setStyle(ButtonStyle.Secondary)
              ),
            ],
          });
        });
      }
    }
  }
}
