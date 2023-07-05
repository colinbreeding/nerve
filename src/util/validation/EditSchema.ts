import { z } from "zod";

export const EditSchema = z.object({
  name: z.string(),
  username: z.string().min(5).max(25),
  bio: z.string().optional(),
  image: z.string().optional(),
});

export type EditSchemaType = z.infer<typeof EditSchema>;
