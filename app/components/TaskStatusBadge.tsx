import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In progress", color: "violet" },
  DONE: { label: "Done", color: "green" },
};

const TaskStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}> {statusMap[status].label} </Badge>
  );
};

export default TaskStatusBadge;
