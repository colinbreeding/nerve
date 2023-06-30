import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "../../../../prisma/client";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, username, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
