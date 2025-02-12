"use client";

import { useOptimistic } from "react";
import { PostType } from "@/types";
import PostDisplay from "./postDisplay";
import PostEditor from "./postEditor";

type AllPostProps = {
  posts: PostType[];
};

export default function AllPosts({ posts }: AllPostProps) {
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

  return (
    <>
      <div className="mx-auto max-w-[1500px] p-4">
        <h1 className="text-4xl font-bold mb-4 font-[family-name:var(--font-geist-sans)] text-[#333333]">
          Update
        </h1>
        <ul className="font-[family-name:var(--font-geist-sans)] flex flex-wrap gap-4">
          {optimisticState.map((item) => (
            <PostEditor
              key={item.id}
              item={item}
              updateOptimistic={updateOptimistic}
            />
          ))}
        </ul>
      </div>
      <div className="mx-auto max-w-[1500px] p-4">
        <h1 className="text-4xl font-bold mb-4 font-[family-name:var(--font-geist-sans)] text-[#333333]">
          Delete
        </h1>
        <ul className="font-[family-name:var(--font-geist-sans)] flex flex-wrap gap-4">
          {optimisticState.map((item) => (
            <PostDisplay key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
}
