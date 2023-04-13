import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const dashboardRouter = createTRPCRouter({
  getSession: protectedProcedure.query(({ ctx }) => {
    return ctx.session;
  }), 
  createCourse: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        header: z.string(),
        price: z.number().default(0),
        image: z.string().default(""),
        language: z.string(),
        type: z.string(),
        isNew: z.boolean().optional(),
        isForSale: z.boolean().optional(),
        categories: z.string(),
        thingToLearn: z.array(z.object({ str: z.string() })),
        descriptions: z.array(
          z.object({
            h1: z.string(),
            paragraph: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.courses.create({
        data: {
          author: ctx.session.user.image as string,
          title: input.title,
          header: input.header,
          description: input.descriptions,
          price: input.price,
          image: input.image,
          language: input.language,
          type: input.type,
          isNew: input.isNew,
          isForSale: input.isForSale,
          categories: input.title,
          activity: input.title,
          thingToLearn: input.title,
        },
      });
    }),
});
