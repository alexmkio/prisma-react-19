import AllPosts from "@/components/allPosts";
import PostCreator from "@/components/postCreator";
import prisma from "@/lib/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return (
    <>
      <AllPosts posts={posts} />
      <PostCreator />
    </>
  );
}
