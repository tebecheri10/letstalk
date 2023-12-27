import { db } from "@/db"
import { Post } from '@prisma/client'
import PostCreateForm from "@/components/posts/post-create-form"
import PostList from "@/components/posts/post-list"
import { fetchPostsByTopicSlug } from "@/db/queries/posts"

interface TopicShowPageProps {
  params : {
    slug: string
  }
}

const TopicShowPage = async(props:TopicShowPageProps) => {
  const topicSlug = props.params.slug

  const posts:Post[] = await db.post.findMany({
    where: {
      topic: {
        slug: topicSlug
      }
    }
  })

  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3">
        <h2 className="font-bold text-xl">{topicSlug}</h2>
          <PostList fetchData={()=> fetchPostsByTopicSlug(topicSlug)} />
        </div>

        <div className="col-span-1">
          <PostCreateForm slug={topicSlug} />
        </div>
      </div>
    </>
  );
};

export default TopicShowPage;
