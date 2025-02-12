"use client";

import { useActionState, useOptimistic, useState } from "react";
import { PostType } from "@/types";
import EditablePost from "./editablePost";
import DeletablePost from "./deletablePost";
import Link from "next/link";
import { updateItemAction } from "@/app/actions";

type AllPostProps = {
  posts: PostType[];
};

export default async function AllPosts({ posts }: AllPostProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [optimisticState, updateOptimistic] = useOptimistic(
    posts,
    (state, updatedPost: FormData) => {
      const postID = Number(updatedPost.get("id"));
      const newArray = state.map((item) =>
        item.id === postID
          ? {
              ...item,
              title: updatedPost.get("title") as string,
              content: updatedPost.get("content") as string | null,
              published: (updatedPost.get("publish") as string) === "true",
            }
          : item
      );
      return newArray;
    }
  );

  const [error, formAction, isPending] = useActionState(
    async (_prevState: any, formData: FormData) => {
      updateOptimistic(formData);
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
    <>
      <div className="mx-auto max-w-[1500px] p-4">
        <h1 className="text-4xl font-bold mb-4 font-[family-name:var(--font-geist-sans)] text-[#333333]">
          All Posts
        </h1>
        <ul className="font-[family-name:var(--font-geist-sans)] flex flex-wrap gap-4">
          {optimisticState.map((post) => (
            <li
              key={post.id}
              className="text-blue-500 bg-gray-50 hover:bg-gray-100 rounded-lg p-4 flex flex-col w-96 relative"
            >
              <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Done" : "Edit"}
              </button>
              {isEditing ? (
                <EditablePost
                  post={post}
                  setIsEditing={setIsEditing}
                  updateOptimisticPost={updateOptimistic}
                  error={error}
                  formAction={formAction}
                  isPending={isPending}
                />
              ) : (
                <DeletablePost post={post} />
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto max-w-[1500px] p-4">
        <h1 className="text-4xl font-bold mb-4 font-[family-name:var(--font-geist-sans)] text-[#333333]">
          Published Posts
        </h1>
        <ul className="font-[family-name:var(--font-geist-sans)] flex flex-wrap gap-4">
          {optimisticState.map((post) => (
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
    </>
  );
}
