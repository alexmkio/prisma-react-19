import { useState, useTransition } from "react";
import XMark from "@/icons/xMark";
import { deleteItemAction } from "@/app/actions";
import { PostType } from "@/types";
import Link from "next/link";
import clsx from "clsx";

export default function PostDisplay({ item }: { item: PostType }) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (postID: number) => {
    startTransition(async () => {
      const result = await deleteItemAction(postID);
      if (!result.success) {
        setError(result.error);
      }
    });
  };

  // using middleware example
  // const router = useRouter();
  // const handleDelete = (postID: number) => {
  //   startDeleteTransition(async () => {
  //     const response = await fetch(`/api/posts?id=${postID}`, {
  //       method: "DELETE",
  //     });

  //     if (!response.ok) {
  //       setDeleteError(response);
  //       return;
  //     }

  //     // revalidatePath can only be used in a server-side context—it needs access to Next.js’s static generation store, which isn’t available in client-side code.
  //     // The function handleDelete is defined and called on the client (for example, via an event handler), so when you invoke revalidatePath("/") there, it’s running on the client, which causes the error:
  //     // Error: static generation store missing in revalidatePath
  //     // Fix: move it to middleware or turn this into a Server Action
  //     // revalidatePath("/");
  //     router.refresh();
  //     return;
  //   });
  // };

  return (
    <li
      key={item.id}
      className={clsx(
        "relative rounded-lg p-4 flex flex-col w-96",
        isPending
          ? "bg-red-500 hover:bg-red-600"
          : "bg-gray-50 hover:bg-gray-100"
      )}
    >
      <button
        className="absolute top-0 right-0 p-4 flex items-center gap-1 text-black"
        onClick={() => handleDelete(item.id)}
        disabled={isPending}
      >
        Delete <XMark className="size-6" />
      </button>
      {isPending && <p className="text-white text-lg">Deleting...</p>}
      {error && <p>Error: {error}</p>}
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
