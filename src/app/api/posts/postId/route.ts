import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("postId");

  if (postId) {
    try {
      const userPost = await prisma.post.findFirst({
        where: {
          id: postId,
        },
        include: {
          user: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return NextResponse.json(userPost, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  const { postId } = await req.json();

  if (postId) {
    try {
      const userPost = await prisma.post.delete({
        where: {
          id: postId,
        },
      });
      return NextResponse.json(userPost, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
  }
}
