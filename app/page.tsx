import { prisma } from "@/lib/prisma";
import { Flex, Grid } from "@radix-ui/themes";
import LatestTasks from "./LatestTasks";
import TaskChart from "./TaskChart";
import TaskSummary from "./TaskSummary";
import { Metadata } from "next";

const Home = async () => {
  const open = await prisma.task.count({
    where: { status: "OPEN" },
  });
  const inProgress = await prisma.task.count({
    where: { status: "IN_PROGRESS" },
  });
  const done = await prisma.task.count({
    where: { status: "DONE" },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <TaskSummary open={open} inProgress={inProgress} done={done} />
        <TaskChart open={open} inProgress={inProgress} done={done} />
      </Flex>
      <LatestTasks />
    </Grid>
  );
};

export const metadata: Metadata = {
  title: "Task Tracker - Dashboard",
  description: "View a summary of the project tasks",
};

export default Home;
