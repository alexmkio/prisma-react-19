"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateItemAction(formData: FormData) {
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
}

export async function createItemAction(formData: FormData) {
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
}

export async function deleteItemAction(id: number) {
  await prisma.post.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
}
