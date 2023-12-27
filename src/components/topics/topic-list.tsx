import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { db } from "@/db";
import type { Topic } from "@prisma/client";
import { paths } from "@/paths";

const TopicList = async () => {
  const topics = await db.topic.findMany();

  const renderedTopics = topics.map((topic: Topic) => {
    return (
      <Link key={topic?.id} href={paths.topicShow(topic?.slug)}>
        <Chip color="warning" variant="shadow">
          {topic?.slug}
        </Chip>
      </Link>
    );
  });

  return <div className="flex flex-col gap-4">
    {renderedTopics}
  </div>;
};

export default TopicList;
