import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export async function GET() {
  try {
    const allUsers = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ allUsers }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
