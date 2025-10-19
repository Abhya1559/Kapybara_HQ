import { posts } from "@/src/db/schema";
import { db } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = Number(id);

    const body = await req.json();

    const updatedPost = await db
      .update(posts)
      .set({
        title: body.title,
        content: body.content,
        published: body.published,
        updated_at: new Date(),
        ...(body.slug ? { slug: body.slug } : {}),
      })
      .where(eq(posts.id, postId))
      .returning();

    if (!updatedPost.length) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Post updated successfully", data: updatedPost[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = Number(id);
    const body = await req.json();

    const deletedPost = await db
      .delete(posts)
      .where(eq(posts.id, postId))
      .returning();

    if (!deletedPost.length) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Post deleted successfully", data: deletedPost[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
