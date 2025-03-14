import { Link, TaskStatusBadge } from "@/app/components";
import { Status, Task } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";

export interface taskQuery {
  status: Status;
  orderBy: keyof Task;
  page: string;
}

interface Props {
  searchParams: taskQuery;
  tasks: Task[];
}

const TaskTable = async ({ tasks, searchParams }: Props) => {
  const params = await searchParams;
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink href={{ query: { ...params, orderBy: column.value } }}>
                {column.label}
              </NextLink>
              {column.value === params.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
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
  );
};

const columns: { label: string; value: keyof Task; className?: string }[] = [
  { label: "Task", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnValues = columns.map((column) => column.value);

export default TaskTable;
