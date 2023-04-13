import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const dashboardRouter = createTRPCRouter({
  getSession: protectedProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getAllCourses: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.courses.findMany({
      where: {
        author: ctx.session.user.image || "",
      },
    });
  }),
  getCourseById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.courses.findUnique({
        where: {
          id: input.id,
        },
      });
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
      const now = new Date();
      return await ctx.prisma.courses.create({
        data: {
          author: ctx.session.user.image as string,
          title: input.title,
          authorName: ctx.session.user.name as string,
          header: input.header,
          description: input.descriptions,
          price: input.price,
          image: input.image,
          language: input.language,
          type: input.type,
          isNew: input.isNew,
          isForSale: input.isForSale,
          categories: input.categories,
          activity: `Created by ${
            ctx.session.user.name as string
          } at ${now.toDateString()}`,
          thingToLearn: input.thingToLearn,
        },
      });
    }),
});