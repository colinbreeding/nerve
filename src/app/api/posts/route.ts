import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (userId) {
    try {
      const userPosts = await prisma.post.findMany({
        where: {
          userId,
        },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return NextResponse.json(userPosts, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    try {
      const allPosts = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return NextResponse.json(allPosts, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}

export async function POST(req: NextRequest) {
  const { body, id } = await req.json();
  try {
    const createdPost = await prisma.post.create({
      data: {
        body,
        userId: id,
      },
    });
    return NextResponse.json(createdPost, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Infinite Scroll Endpoint
// import { z } from "zod";
// import { prisma } from "../../../../prisma/client";
// import { NextRequest, NextResponse } from "next/server";
//
// export async function GET(req: NextRequest) {
//   const url = new URL(req.url);
//
//   try {
//     const { limit, page, userId } = z
//         .object({
//           limit: z.string(),
//           page: z.string(),
//           userId: z.string(),
//         })
//         .parse({
//           limit: url.searchParams.get("limit"),
//           page: url.searchParams.get("page"),
//           userId: url.searchParams.get("userId"),
//         });
//
//     const posts = await prisma.post.findMany({
//       take: parseInt(limit),
//       skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
//       orderBy: {
//         createdAt: "desc",
//       },
//       include: {
//         user: true,
//         comments: true,
//       },
//       where: {
//         userId,
//       },
//     });
//
//     return NextResponse.json(posts, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//         { error: "Failed to fetch more posts" },
//         { status: 500 }
//     );
//   }
// }
