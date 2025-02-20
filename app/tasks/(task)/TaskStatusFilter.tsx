import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";

const Statuses: { label: string; value?: Status | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Done", value: "DONE" },
];

const TaskStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {Statuses.map((status) => (
          <Select.Item key={status.label} value={status.value!}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default TaskStatusFilter;
