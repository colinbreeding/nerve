import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, currentUserId } = body;
  try {
    if (!currentUserId) {
      return NextResponse.json(
        { error: "You must be logged in" },
        { status: 400 }
      );
    }
    const follow = await prisma.follower.findFirst({
      where: {
        userId: userId,
        followerId: currentUserId,
      },
    });
    if (!follow) {
      return NextResponse.json(
        { message: "Follower not found" },
        { status: 400 }
      );
    }
    const deleteFollow = await prisma.follower.delete({
      where: {
        id: follow.id,
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
