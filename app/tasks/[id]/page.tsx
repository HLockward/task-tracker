import TaskStatusBadge from "@/app/components/TaskStatusBadge";
import { prisma } from "@/lib/prisma";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const TaskDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
  });

  if (!task) notFound();

  return (
    <div>
      <Heading>{task.title}</Heading>
      <Flex gap="3" my="2">
        <TaskStatusBadge status={task.status} />
        <Text>{task.createdAt.toDateString()}</Text>
      </Flex>
      <Card>{task.description}</Card>
    </div>
  );
};

export default TaskDetailPage;
