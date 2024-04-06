import { createMiddleware } from "seyfert";

export default createMiddleware<void>(({ next, stop }) => {
  stop("This command is under development");

  next();
});
