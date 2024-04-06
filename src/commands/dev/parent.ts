import { Declare, Command, Options, Middlewares } from "seyfert";
import EvalCommand from "./eval.command";

@Declare({
  name: "dev",
  description: "Commands for devs",
})
@Options([EvalCommand])
// @ts-ignore
@Middlewares(["onlyDev"])
export default class Parent extends Command {}
