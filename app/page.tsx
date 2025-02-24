import { prisma } from "@/lib/prisma";
import TaskSummary from "./TaskSummary";

export default async function Home() {
  const open = await prisma.task.count({
    where: { status: "OPEN" },
  });
  const inProgress = await prisma.task.count({
    where: { status: "IN_PROGRESS" },
  });
  const done = await prisma.task.count({
    where: { status: "DONE" },
  });
  return <TaskSummary open={open} inProgress={inProgress} done={done} />;
}
