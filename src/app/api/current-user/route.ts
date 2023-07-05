import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../prisma/client";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in." },
      { status: 400 }
    );
  } else {
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string,
      },
    });
    return NextResponse.json(currentUser, { status: 200 });
  }
}
