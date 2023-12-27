import { db } from "@/db";
import type { Post } from "@prisma/client";

export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string };
  _count: { comments: number };
};

export function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  }) as Promise<PostWithData[]>;
}

export function fetchTopPosts(): Promise<PostWithData[]> {
  return db.post.findMany({
    orderBy: {
      comments: {
        _count: "desc",
      },
    },
    take: 5,
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
  }) as Promise<PostWithData[]>;
}

export function fetchPostBySearchTerm(searchTerm: string):Promise<PostWithData[]>{
    return db.post.findMany({
        include: {
          topic: { select: { slug: true } },
          user: { select: { name: true } },
          _count: { select: { comments: true } },
        },
        where: {
           OR: [{
                title: { contains: searchTerm }
           }]
        }
    }) as Promise<PostWithData[]>
}
