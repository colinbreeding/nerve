import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") ?? "";
  if (userId) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      // const followersCount = await prisma.user.count({
      //   where: {
      //     followingIds: {
      //       has: userId,
      //     },
      //   },
      // });
      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    try {
      const allUsers = await prisma.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      return NextResponse.json(allUsers, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}