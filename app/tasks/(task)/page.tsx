import { Link, TaskStatusBadge } from "@/app/components";
import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import TaskActions from "./TaskActions";

interface Props {
  searchParams: {
    status: Status;
  };
}

const Tasks = async ({ searchParams }: Props) => {
  const { status } = await searchParams;
  const statuses = Object.values(Status);
  const statusFilter = statuses.includes(status) ? status : undefined;
  const tasks = await prisma.task.findMany({
    where: {
      status: statusFilter,
    },
  });

  return (
    <div>
      <TaskActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Task</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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
    </div>
  );
};

export const dynamic = "force-dynamic";
export default Tasks;
