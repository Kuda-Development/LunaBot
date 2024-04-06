import type { PrismaClient } from "@prisma/client";
import { ParseClient, Client } from "seyfert";
import { middlewares } from "src/middlewares";
import { SaveNoExistDataProps } from "src/utils/saveNoExistData";

declare module "seyfert" {
  interface UsingClient extends ParseClient<Client<true>> {}
  interface Client {
    prisma: PrismaClient;
    saveNoExistData: (props: SaveNoExistDataProps) => Promise<void>;
  }
  interface RegisteredMiddlewares
    extends ParseMiddlewares<typeof middlewares> {}
  interface GlobalMetadata extends ParseMiddlewares<typeof middlewares> {}
  interface InternalOptions {
    withPrefix: true | false;
    asyncCache: true | false;
  }
}
