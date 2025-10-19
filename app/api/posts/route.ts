import { posts } from "@/src/db/schema";
import { db } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    const data = await db
      .insert(posts)
      .values({
        title: body.title,
        slug: body.slug,
        content: body.content,
        published: body.published ?? false,
      })
      .returning();

    return NextResponse.json(
      { message: "Post created successfully", data: data[0] },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post:" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allPosts = await db.select().from(posts);
    return NextResponse.json(allPosts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
