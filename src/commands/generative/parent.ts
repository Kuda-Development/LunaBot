import { Declare, Command, Options } from "seyfert";
import TextCommand from "./text.command";

@Declare({
  name: "generative",
  description: "Commands for generative ai models with provider Huggingface",
})
@Options([TextCommand])
export default class Parent extends Command {}
