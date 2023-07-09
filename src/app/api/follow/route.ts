import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  try {
    if (!userId) {
      return NextResponse.json({ error: "Unknown User ID" }, { status: 400 });
    }
    const getFollowers = await prisma.follower.findMany({
      where: {
        userId: userId,
      },
    });
    const getFollowing = await prisma.follower.findMany({
      where: {
        followerId: userId,
      },
    });
    const response = {
      Followers: getFollowers,
      Following: getFollowing,
    };
    return NextResponse.json(response, { status: 200 });
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
  const { userId, currentUserId } = body;
  try {
    if (!currentUserId) {
      return NextResponse.json(
        { error: "You must be logged in" },
        { status: 400 }
      );
    }
    const addFollow = await prisma.follower.create({
      data: {
        userId: userId,
        followerId: currentUserId,
      },
    });
    return NextResponse.json(addFollow, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
