"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const Statuses: { label: string; value?: Status | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Done", value: "DONE" },
];

const TaskStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const FilterByStatus = (status: string) => {
    const params = new URLSearchParams();
    if (status !== "ALL") params.append("status", status);
    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);
    const query = params.size ? `?${params.toString()}` : "";
    router.push(`/tasks${query}`);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "ALL"}
      onValueChange={(value) => FilterByStatus(value)}
    >
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
