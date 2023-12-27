import TopicCreatForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { Divider } from "@nextui-org/react";
import PostList from "@/components/posts/post-list";
import { fetchTopPosts } from "@/db/queries/posts";

export default async function Home() {

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl font-bold m-2">Top Posts</h1>
        <PostList 
         fetchData={() => fetchTopPosts()}
        />
      </div>
      <div>
        <div className="my-4">
          <TopicCreatForm />
        </div>
        <Divider className="my-2" />
        <h3 className="text-sm font-bold my-2">Topics</h3>
        <TopicList />
      </div>
    </div>
  );
}
