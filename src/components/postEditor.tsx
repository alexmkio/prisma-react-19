import { updateItemAction } from "@/app/actions";
import Form from "next/form";
import { useActionState } from "react";
import { PostType } from "@/types";
import { SubmitButton } from "./submitButton";
import clsx from "clsx";

type EditablePostProps = {
  item: PostType;
  updateOptimistic: (post: FormData) => void;
};

export default function PostEditor({
  item,
  updateOptimistic,
}: EditablePostProps) {
  // Before using useTransition
  // const [isPending, startTransition] = useTransition();

  // const handleUpdate = (formData: FormData) => {
  //   startTransition(async () => {
  //     await updateItemAction(formData);
  //   });
  // };

  const [error, formAction, isPending] = useActionState(
    async (_prevState: any, formData: FormData) => {
      updateOptimistic(formData);
      const result = await updateItemAction(formData);
      if (!result.success) {
        return result.error;
      }
      return null;
    },
    null
  );

  return (
    <li
      key={item?.id}
      className={clsx(
        "text-blue-500 rounded-lg p-4 flex flex-col w-96 relative",
        isPending
          ? "bg-red-500 hover:bg-red-600"
          : "bg-gray-50 hover:bg-gray-100"
      )}
    >
      <Form action={formAction} className="">
        {isPending && <p className="text-white text-lg">Updating...</p>}
        {error && <p>{error}</p>}
        <input type="hidden" name="id" value={item?.id} />
        <div>
          <label htmlFor="title" className="block text-lg mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your post title"
            defaultValue={item?.title}
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
            defaultValue={item?.content ?? ""}
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
                defaultChecked={item?.published === true}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="publish"
                value="false"
                defaultChecked={item?.published === false}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>
        <SubmitButton className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600" />
      </Form>
    </li>
  );
}
