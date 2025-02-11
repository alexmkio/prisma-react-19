import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const response = await prisma.post.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    revalidatePath("/");
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
