"use client";

import { useOptimistic, useState } from "react";
import EditablePost from "./editablePost";
import DeletablePost from "./deletablePost";
import { PostType } from "@/types";

type PostProps = {
  post: PostType;
  updateOptimistic: (post: FormData) => void;
};

export default function Post({ post, updateOptimistic }: PostProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
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
        />
      ) : (
        <DeletablePost post={post} />
      )}
    </li>
  );
}
