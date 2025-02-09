import prisma from "@/lib/prisma";
import EditablePost from "./editablePost";

export default async function AllPosts() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return (
    <div className="mx-auto max-w-[1500px] p-4">
      <h1 className="text-4xl font-bold mb-4 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        All Posts
      </h1>
      <ul className="font-[family-name:var(--font-geist-sans)] flex flex-wrap gap-4">
        {posts.map((post) => (
          <EditablePost key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}
