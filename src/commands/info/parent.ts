import { Declare, Command, Options } from "seyfert";
import PingCommand from "./ping.command";

@Declare({
  name: "info",
  description: "Commands for info",
})
@Options([PingCommand])
export default class InfoCommands extends Command {}
