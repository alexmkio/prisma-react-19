import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function PublishedPosts() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: true,
    },
  });

  return (
    <div className="mx-auto max-w-[1500px] p-4">
      <h1 className="text-4xl font-bold mb-4 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Published Posts
      </h1>
      <ul className="font-[family-name:var(--font-geist-sans)] flex flex-wrap gap-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/posts/${post.id}`}
              className="text-blue-500 hover:underline bg-gray-50 hover:bg-gray-100 rounded-lg p-4 flex flex-col w-96"
            >
              <span className="text-sm text-gray-600">
                Author: {post.author.name}
              </span>
              <span className="font-semibold">Title: {post.title}</span>
              <span className="font-semibold">
                Published: {post.published.toString()}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
