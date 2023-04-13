import { z } from "zod";
export const courseFormSchema = z.object({
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
  });

  export const courseEditFormSchema = z.object({
    id:z.string(),
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
  });
