import { useActionState } from "react";
import XMark from "@/icons/xMark";
import { deleteItemAction } from "@/app/actions";
import { PostType } from "@/types";
import Link from "next/link";
import clsx from "clsx";
import Form from "next/form";

export default function PostDisplay({ item }: { item: PostType }) {
  const [error, formAction, isPending] = useActionState(
    async (_prevState: any, formData: FormData) => {
      const postID = Number(formData.get("id"));
      const result = await deleteItemAction(postID);
      if (!result.success) {
        return result.error;
      }
      return null;
    },
    null
  );

  return (
    <li
      key={item.id}
      className={clsx(
        "relative rounded-lg p-4 flex flex-col w-96",
        isPending || item?.pending
          ? "bg-red-500 hover:bg-red-600"
          : "bg-gray-50 hover:bg-gray-100"
      )}
    >
      <Form
        action={formAction}
        className="absolute top-0 right-0 p-4 flex items-center gap-1 text-black"
      >
        <input type="hidden" name="id" value={item?.id} />
        <button type="submit" disabled={isPending}>
          Delete <XMark className="size-6" />
        </button>
      </Form>
      {isPending && <p className="text-white text-lg">Deleting...</p>}
      {error && <p>Error: {error}</p>}
      {item?.pending && <p className="text-white text-lg">Update pending...</p>}
      <span className="text-sm text-gray-600">Author: {item.author.name}</span>
      <span className="font-semibold">Title: {item.title}</span>
      <span className="font-semibold">
        Published: {item.published.toString()}
      </span>
      <Link href={`/posts/${item.id}`} className="text-blue-500">
        Link to post
      </Link>
    </li>
  );
}
