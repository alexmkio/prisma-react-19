"use client";

import { useState } from "react";
import EditablePost from "./editablePost";
import DeletablePost from "./deletablePost";
import { PostType } from "@/types";

export default function Post({ post }: { post: PostType }) {
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
        <EditablePost post={post} setIsEditing={setIsEditing} />
      ) : (
        <DeletablePost post={post} />
      )}
    </li>
  );
}
