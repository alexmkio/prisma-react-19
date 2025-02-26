import AllPosts from "@/components/allPosts";
import prisma from "@/lib/prisma";

export default async function GetPosts() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return <AllPosts posts={posts} />;
}
