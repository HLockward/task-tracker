import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import DeleteTaskButton from "./DeleteTaskButton";
import EditTaskButton from "./EditTaskButton";
import TaskDetails from "./TaskDetails";

interface Props {
  params: Promise<{ id: string }>;
}

const fetchTask = cache((taskId: number) =>
  prisma.task.findUnique({ where: { id: taskId } })
);

const TaskDetailPage = async ({ params }: Props) => {
  const session = await auth();
  const { id } = await params;
  const task = await fetchTask(parseInt(id));

  if (!task) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <TaskDetails task={task} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect task={task} />
            <EditTaskButton taskId={task.id} />
            <DeleteTaskButton taskId={task.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const task = await fetchTask(parseInt((await params).id));

  return {
    title: task?.title,
    description: `Details of task ${task?.id}`,
  };
}

export default TaskDetailPage;
