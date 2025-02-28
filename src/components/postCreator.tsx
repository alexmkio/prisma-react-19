"use client";

import Form from "next/form";
import { createItemAction } from "@/app/actions";
import { useActionState } from "react";
import { SubmitButton } from "./submitButton";

export default function PostCreator() {
  const [state, formAction, isPending] = useActionState(
    async (
      _prevState: { success: boolean; error: null | string } | null,
      formData: FormData
    ) => {
      const data = await createItemAction(formData);
      return data;
    },
    null
  );

  return (
    <div className="mx-auto max-w-[1500px] p-4">
      <h1 className="text-4xl font-bold mb-4 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Create
      </h1>
      {isPending && <p className="text-lg text-red-600">Creating...</p>}
      {!state?.success && <p>{state?.error}</p>}
      <Form action={formAction} className="max-w-2xl space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your post title"
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
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="publish"
                value="false"
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>
        <SubmitButton
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
          loadingText="Creating..."
          defaultText="Create"
        />
      </Form>
    </div>
  );
}
