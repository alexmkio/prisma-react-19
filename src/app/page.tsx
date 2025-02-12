import AllPosts from "@/components/allPosts";
import NewPost from "@/components/newPost";
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
      <NewPost />
    </>
  );
}
