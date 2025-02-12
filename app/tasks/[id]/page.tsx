import { TaskStatusBadge } from "@/app/components";
import { prisma } from "@/lib/prisma";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Heading>{task.title}</Heading>
        <Flex gap="3" my="2">
          <TaskStatusBadge status={task.status} />
          <Text>{task.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkdown>{task.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/tasks/${task.id}/edit`}>Edit Task</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default TaskDetailPage;
