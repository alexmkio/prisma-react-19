import Form from "next/form";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createItemAction } from "@/app/actions";

export default function NewPost() {
  // Unlike FormPost (a client component), I can do this here since this is a server component.
  // async function createPost(formData: FormData) {
  //   "use server";

  //   const title = formData.get("title") as string;
  //   const content = formData.get("content") as string;
  //   const published = formData.get("publish") as string;

  //   await prisma.post.create({
  //     data: {
  //       title,
  //       content,
  //       authorId: 1,
  //       published: published === "true",
  //     },
  //   });

  //   revalidatePath("/");
  //   revalidatePath("/posts");
  // }

  return (
    <div className="mx-auto max-w-[1500px] p-4">
      <h1 className="text-4xl font-bold mb-4 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Create New Post
      </h1>
      <Form action={createItemAction} className="max-w-2xl space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your post title"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-lg mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Write your post content here..."
            rows={6}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-lg mb-2">Publish</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="publish"
                value="true"
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="publish"
                value="false"
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Create Post
        </button>
      </Form>
    </div>
  );
}
