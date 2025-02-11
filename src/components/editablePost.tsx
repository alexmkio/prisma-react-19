import { Post, User } from "@prisma/client";
import { updateItemAction } from "@/app/actions";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Form from "next/form";
import { useTransition } from "react";

type EditablePostProps = {
  post: Post & { author: User };
  setIsEditing: (isEditing: boolean) => void;
};

export default function EditablePost({
  post,
  setIsEditing,
}: EditablePostProps) {
  const [isPending, startTransition] = useTransition();

  const handleUpdate = (formData: FormData) => {
    startTransition(async () => {
      await updateItemAction(formData);
      setIsEditing(false);
    });
  };

  return (
    <Form action={handleUpdate} className="">
      {isPending && <p>Updating...</p>}
      <input type="hidden" name="id" value={post.id} />
      <div>
        <label htmlFor="title" className="block text-lg mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter your post title"
          defaultValue={post?.title}
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
          defaultValue={post?.content ?? ""}
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
              defaultChecked={post?.published === true}
              className="mr-2"
            />
            Yes
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="publish"
              value="false"
              defaultChecked={post?.published === false}
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
        Edit Post
      </button>
    </Form>
  );
}
