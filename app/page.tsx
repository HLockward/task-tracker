import { prisma } from "@/lib/prisma";
import TaskChart from "./TaskChart";

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
  return <TaskChart open={open} inProgress={inProgress} done={done} />;
}
