import type { PrismaClient } from "@prisma/client";
import { ParseClient, Client } from "seyfert";

declare module "seyfert" {
  interface UsingClient extends ParseClient<Client<true>> {}
  interface Client {
    prisma: PrismaClient;
  }
}
