"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import XMark from "@/icons/xMark";

export default function EditablePost({ post }: { post: any }) {
  const [deleteError, setDeleteError] = useState<Response | null>(null);
  const [isDeletePending, startDeleteTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (postID: number) => {
    startDeleteTransition(async () => {
      const response = await fetch(`/api/posts?id=${postID}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setDeleteError(response);
        return;
      }

      router.refresh();
      return;
    });
  };

  return (
    <li
      key={post.id}
      className="text-blue-500 bg-gray-50 hover:bg-gray-100 rounded-lg p-4 flex flex-col w-96 relative"
    >
      <button
        className="absolute top-0 right-0 p-4"
        onClick={() => handleDelete(post.id)}
        disabled={isDeletePending}
      >
        <XMark className="size-6 text-black" />
      </button>
      {isDeletePending && <p>Deleting...</p>}
      {deleteError && (
        <p>
          Response {deleteError?.status}: {deleteError?.statusText}
        </p>
      )}
      <span className="text-sm text-gray-600">Author: {post.author.name}</span>
      <span className="font-semibold">Title: {post.title}</span>
      <span className="font-semibold">
        Published: {post.published.toString()}
      </span>
    </li>
  );
}
