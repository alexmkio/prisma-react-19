import { updateItemAction } from "@/app/actions";
import Form from "next/form";
import { useActionState } from "react";
import { PostType } from "@/types";
import { SubmitButton } from "./submitButton";

type EditablePostProps = {
  post: PostType;
  setIsEditing: (isEditing: boolean) => void;
};

export default function EditablePost({
  post,
  setIsEditing,
}: EditablePostProps) {
  // Before using useTransition
  // const [isPending, startTransition] = useTransition();

  // const handleUpdate = (formData: FormData) => {
  //   startTransition(async () => {
  //     await updateItemAction(formData);
  //     setIsEditing(false);
  //   });
  // };

  // After using useActionState
  const [error, formAction, isPending] = useActionState(
    async (_prevState: any, formData: FormData) => {
      const result = await updateItemAction(formData);
      if (!result.success) {
        return result.error;
      }
      setIsEditing(false);
      return null;
    },
    null
  );

  return (
    <Form action={formAction} className="">
      {isPending && <p>Updating...</p>}
      {error && <p>{error}</p>}
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
      <SubmitButton className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600" />
    </Form>
  );
}
