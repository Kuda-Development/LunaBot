import { stripIndent } from "common-tags";
import {
  type CommandContext,
  Declare,
  SubCommand,
  Embed,
  Options,
  createStringOption,
  Middlewares,
} from "seyfert";
import { ColorResolvable } from "seyfert/lib/common";
import generative from "../../libs/generative";

const options = {
  prompt: createStringOption({
    description: "The prompt to generate text with",
    required: true,
  }),
};

@Declare({
  name: "text",
  description: "Generative text with your prompt",
})
@Options(options)
// @ts-ignore
@Middlewares(["inDev"])
export default class TextCommand extends SubCommand {
  async run(ctx: CommandContext<typeof options>) {
    const prompt = ctx.options.prompt;

    if (!prompt)
      return await ctx.write({
        content: "Please provide a prompt!",
      });

    await ctx.write({
      content: "**Generating...**",
    });

    const response = await generative({
      prompt: {
        text: prompt,
      },
      generative: {
        model: "gemini-pro",
        config: "free",
      },
    });

    await ctx.editOrReply(
      {
        content: response.text,
        embeds: [],
      },
      true
    );
  }

  async onRunError(ctx: CommandContext<any, never>, error: unknown) {
    ctx.client.logger.fatal(error);
    return await ctx.editOrReply(
      {
        content: "",
        embeds: [
          new Embed()
            .setAuthor({
              iconUrl: ctx.client.me.avatarURL(),
              name: `Hi ${ctx.author.username}`,
            })
            .setColor(process.env.DISCORD_EMBED_COLOR as ColorResolvable)
            .setDescription(stripIndent`
            > Oh no, something went wrong! 
            > **Please informate the developers**`),
        ],
      },
      true
    );
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
            > **${error}**`),
      ],
    });
  }
}
