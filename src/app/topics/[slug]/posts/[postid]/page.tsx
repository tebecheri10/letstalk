import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import { paths } from "@/paths";
import { Suspense } from "react";
import PostShowLoading from "@/components/posts/post-show-loading";

interface PostShowPageProps {
  params: {
    slug: string;
    postid: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postid } = params;

  return (
    <div className="space-y-3 pt-4">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postid} />
      </Suspense>
      <CommentCreateForm postId={postid} startOpen />
      <CommentList fetchData={() => fetchCommentsByPostId(postid)} />
    </div>
  );
}
