import { z } from "zod";

export const CommentSchema = z.object({
  body: z.string().max(300),
});

export type CommentSchemaType = z.infer<typeof CommentSchema>;
