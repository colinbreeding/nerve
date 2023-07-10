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
    try {
      const post = await prisma.post.findFirst({
        where: {
          id: postId,
        },
      });
      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: "Someone replied to your post!",
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
    return NextResponse.json(createdComment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
