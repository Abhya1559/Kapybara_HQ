import { initTRPC } from "@trpc/server";

export const t = initTRPC.create();
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const mergeRouters = t.mergeRouters;
export const middleware = t.middleware;
export const router = t.router;
