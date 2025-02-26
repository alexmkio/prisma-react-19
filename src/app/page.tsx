import GetPosts from "@/components/getPosts";
import PostCreator from "@/components/postCreator";
import Skeleton from "@/components/skeleton";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<Skeleton />}>
        <GetPosts />
      </Suspense>
      <PostCreator />
    </>
  );
}
