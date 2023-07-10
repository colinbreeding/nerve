import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { postId, currentUserId } = body;
  try {
    if (!currentUserId) {
      return NextResponse.json(
        { error: "You must be logged in" },
        { status: 400 }
      );
    }
    const like = await prisma.like.findFirst({
      where: {
        postId: postId,
        likeId: currentUserId,
      },
    });
    if (!like) {
      return NextResponse.json({ message: "Like not found" }, { status: 400 });
    }
    const deleteFollow = await prisma.like.delete({
      where: {
        id: like.id,
      },
    });
    return NextResponse.json(deleteFollow, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
