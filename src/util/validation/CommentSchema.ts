import { z } from "zod";

export const CommentSchema = z.object({
  body: z.string().max(300),
});

export type CommentType = z.infer<typeof CommentSchema>;
