"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createItem(
  _prevState: { success: boolean; error: null | string } | null,
  formData: FormData
) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const published = formData.get("publish") as string;

    await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1,
        published: published === "true",
      },
    });

    revalidatePath("/");
    return { success: true, error: null };
  } catch {
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}

export async function updateItem(formData: FormData) {
  try {
    const id = Number(formData.get("id"));
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const published = formData.get("publish") as string;

    await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        published: published === "true",
      },
    });

    revalidatePath("/");
    return { success: true, error: null };
  } catch {
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}

export async function deleteItem(
  _prevState: { success: boolean; error: null | string } | null,
  formData: FormData
) {
  try {
    const id = Number(formData.get("id"));
    await prisma.post.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");
    return { success: true, error: null };
  } catch {
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
