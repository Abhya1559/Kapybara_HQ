import { z } from "zod";

export const postSchema = z.object({
  id: z.number().int().optional(),
  title: z
    .string()
    .min(1, "title is required")
    .max(255, "title must be at most 255 characters"),
  slug: z.string().min(1).max(255),
  content: z
    .string()
    .min(1, "content is required")
    .max(10000, "content must be at most 10000 characters"),
});

export const categorySchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, "name is required").max(100),
  slug: z.string().min(1, "slug is required").max(100),
  description: z.string().optional(),
});
