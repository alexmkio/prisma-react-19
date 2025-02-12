import { Post, User } from "@prisma/client";

export type PostType = Post & { author: User };
