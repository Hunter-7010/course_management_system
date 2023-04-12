import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  getSession: protectedProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
  registerUser: protectedProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        role: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const password = input.password;
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      const findUser = await ctx.prisma.user.findUnique({
        where: {
          name: input.username,
        },
      });
      if (findUser) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      await ctx.prisma.user.create({
        data: {
          name: input.username,
          password: hash,
          role: input.role,
        },
      });
    }),
});
