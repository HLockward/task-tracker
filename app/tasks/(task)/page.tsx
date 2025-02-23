import { Link, TaskStatusBadge } from "@/app/components";
import Pagination from "@/app/components/Pagination";
import { prisma } from "@/lib/prisma";
import { Status, Task } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import TaskActions from "./TaskActions";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Task;
    page: string;
  };
}

const columns: { label: string; value: keyof Task; className?: string }[] = [
  { label: "Task", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

const Tasks = async ({ searchParams }: Props) => {
  const { status, orderBy, page } = await searchParams;

  const statuses = Object.values(Status);
  const statusFilter = statuses.includes(status) ? status : undefined;
  const where = { status: statusFilter };

  const orderByKeys = columns.map((column) => column.value).includes(orderBy)
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

  const queryString = (status: Status, orderBy: keyof Task) => {
    if (status) {
      return `/tasks?status=${status}&orderBy=${orderBy}`;
    }
    return `/tasks?orderBy=${orderBy}`;
  };

  return (
    <Flex gap="3" direction="column">
      <TaskActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink href={queryString(status, column.value)}>
                  {column.label}
                </NextLink>
                {column.value === orderBy && <ArrowUpIcon className="inline" />}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task.id}>
              <Table.Cell>
                <Link href={`/tasks/${task.id}`}>{task.title}</Link>
                <div className="block md:hidden">
                  <TaskStatusBadge status={task.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <TaskStatusBadge status={task.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {task.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
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
