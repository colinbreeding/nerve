import { UserType } from "@/util/types/UserType";

export interface PostType {
  body?: string;
  comments?: string[];
  followers?: string[];
  createdAt: string;
  id: string;
  updatedAt: string;
  userId: string;
  user: UserType;
}
