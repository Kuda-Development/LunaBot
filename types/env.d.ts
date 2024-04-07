declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** Discord bot token (found {@link https://discord.com/developers/applications here}) */
      DISCORD_BOT_TOKEN: string;

      /** Discord bot's app ID (found {@link https://discord.com/developers/applications here}) */
      DISCORD_APP_ID: string;

      /** The embed color of the bot ({@link https://discord.com/developers/docs/resources/channel#embed-object here}) */
      DISCORD_EMBED_COLOR: string;

      /** The devs id of the bot
       * @example "user:id:1 user:id:2 user:id:3"
       */
      DISCORD_DEVS_IDS: string;

      /** Database URL ({@link https://pris.ly/d/connection-strings more info}) */
      MONGO_DATABASE_URL: string;

      /** The huggingface api key
       * ({@link https://huggingface.co/settings/tokens here})
       * @alert PLEASE DO NOT SHARE YOUR API KEY
       * @deprecated This environment variable is deprecated, later it will be used in the bot.
       */
      HUGGINGFACE_API_KEY: string;

      /** The gemini api key
       * ({@link https://aistudio.google.com/app/apikey here})
       * @alert PLEASE DO NOT SHARE YOUR API KEY
       * @deprecated This environment variable is deprecated, later it will be used in the bot.
       */
      GEMINI_API_KEY: string;
    }
  }
}

export {};
