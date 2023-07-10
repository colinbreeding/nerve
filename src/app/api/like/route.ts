import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("postId");

  try {
    if (!postId) {
      return NextResponse.json({ error: "Unknown Post ID" }, { status: 400 });
    }
    const likes = await prisma.like.findMany({
      where: {
        postId: postId,
      },
    });
    return NextResponse.json(likes, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

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
    const addLike = await prisma.like.create({
      data: {
        postId: postId,
        likeId: currentUserId,
      },
    });
    try {
      const post = await prisma.post.findFirst({
        where: {
          id: postId,
        },
      });
      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: "Someone liked your post!",
            userId: post.userId,
          },
        });
        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Notification Update Failed" },
        { status: 500 }
      );
    }
    return NextResponse.json(addLike, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
