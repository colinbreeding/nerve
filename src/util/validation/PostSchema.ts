import { z } from "zod";

export const PostSchema = z.object({
  body: z.string().max(300),
});

export type PostType = z.infer<typeof PostSchema>;
