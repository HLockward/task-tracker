import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import TaskForm from "../../_components/TaskForm";

interface Props {
  params: Promise<{ id: string }>;
}

const EditTaskPage = async ({ params }: Props) => {
  const { id } = await params;
  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
  });

  if (!task) notFound();

  return <TaskForm task={task} />;
};

export default EditTaskPage;
