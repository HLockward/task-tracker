import Pagination from "@/app/components/Pagination";
import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import TaskActions from "./TaskActions";
import TaskTable, { columnValues, taskQuery } from "./TaskTable";

interface Props {
  searchParams: taskQuery;
}

const Tasks = async ({ searchParams }: Props) => {
  const { status, orderBy, page } = await searchParams;

  const statuses = Object.values(Status);
  const statusFilter = statuses.includes(status) ? status : undefined;
  const where = { status: statusFilter };

  const orderByKeys = columnValues.includes(orderBy)
    ? { [orderBy]: "asc" }
    : undefined;

  const currentPage = parseInt(page) || 1;
  const pageSize = 10;
  const tasks = await prisma.task.findMany({
    where,
    orderBy: orderByKeys,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const tasksCount = await prisma.task.count({
    where,
  });

  return (
    <Flex gap="3" direction="column">
      <TaskActions />
      <TaskTable tasks={tasks} searchParams={searchParams} />
      <Pagination
        itemCount={tasksCount}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";
export default Tasks;
