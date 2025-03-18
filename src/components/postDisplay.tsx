import { useActionState } from "react";
import XMark from "@/icons/xMark";
import { deleteItem } from "@/app/actions";
import { PostType } from "@/types";
import Link from "next/link";
import clsx from "clsx";
import Form from "next/form";
import { SubmitButton } from "./submitButton";

type PostDisplayProps = {
  item: PostType;
};

export default function PostDisplay({ item }: PostDisplayProps) {
  const [state, formAction, isPending] = useActionState(deleteItem, null);

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
        <SubmitButton loadingText="Deleting..." defaultText="Delete">
          <XMark className="size-6" />
        </SubmitButton>
      </Form>
      {isPending && <p className="text-white text-lg">Deleting...</p>}
      {isPending && state?.success === false && <p>Error: {state?.error}</p>}
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
