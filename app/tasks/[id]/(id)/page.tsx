import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteTaskButton from "./DeleteTaskButton";
import EditTaskButton from "./EditTaskButton";
import TaskDetails from "./TaskDetails";

interface Props {
  params: Promise<{ id: string }>;
}

const TaskDetailPage = async ({ params }: Props) => {
  const session = await auth();
  const { id } = await params;
  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
  });

  if (!task) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <TaskDetails task={task} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect />
            <EditTaskButton taskId={task.id} />
            <DeleteTaskButton taskId={task.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default TaskDetailPage;
