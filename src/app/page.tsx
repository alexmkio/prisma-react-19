import AllPosts from "@/components/allPosts";
import PostCreator from "@/components/postCreator";
import Skeleton from "@/components/skeleton";
import prisma from "@/lib/prisma";
import { Suspense } from "react";

export default function Home() {
  const postsPromise = prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return (
    <>
      <Suspense fallback={<Skeleton />}>
        <AllPosts postsPromise={postsPromise} />
      </Suspense>
      <PostCreator />
    </>
  );
}
