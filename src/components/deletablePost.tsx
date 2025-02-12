// "use client";

import { useState, useTransition } from "react";
import XMark from "@/icons/xMark";
import { deleteItemAction } from "@/app/actions";
import { PostType } from "@/types";

export default function DeletablePost({ post }: { post: PostType }) {
  const [deleteError, setDeleteError] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (postID: number) => {
    startTransition(async () => {
      const result = await deleteItemAction(postID);
      if (!result.success) {
        setDeleteError(result.error);
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
    <>
      <button
        className="absolute top-0 right-0 p-4 flex items-center gap-1 text-black"
        onClick={() => handleDelete(post.id)}
        disabled={isPending}
      >
        Delete <XMark className="size-6" />
      </button>
      {isPending && <p>Deleting...</p>}
      {deleteError && (
        <p>Response {deleteError}</p>
        // <p>
        //   Response {deleteError?.status}: {deleteError?.statusText}
        // </p>
      )}
      <span className="text-sm text-gray-600">Author: {post.author.name}</span>
      <span className="font-semibold">Title: {post.title}</span>
      <span className="font-semibold">
        Published: {post.published.toString()}
      </span>
    </>
  );
}
