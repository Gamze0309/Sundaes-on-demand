import { setupServer } from "mws/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
