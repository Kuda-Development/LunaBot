import { Declare, Command, Options } from "seyfert";
import TicketsCommand from "./tickets.command";

@Declare({
  name: "setup",
  description: "Commands for setting up the bot",
})
@Options([TicketsCommand])
export default class Parent extends Command {}
