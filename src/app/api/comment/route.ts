import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export async function POST(req: NextRequest) {
  const { commentBody, postId, userId } = await req.json();
  try {
    if (!postId) {
      return NextResponse.json({ error: "Unknown Post ID" }, { status: 400 });
    }
    const createdComment = await prisma.comment.create({
      data: {
        body: commentBody,
        userId: userId,
        postId: postId,
      },
    });
    return NextResponse.json(createdComment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
