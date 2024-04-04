import { Declare, Command, Options } from "seyfert";
import EvalCommand from "./eval.command";

@Declare({
  name: "dev",
  description: "Commands for devs",
})
@Options([EvalCommand])
export default class DevCommands extends Command {}
