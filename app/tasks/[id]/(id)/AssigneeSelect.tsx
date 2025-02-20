"use client";
import Skeleton from "@/app/components/Skeleton";
import { Task, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssigneeSelect = ({ task }: { task: Task }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/user").then((res) => res.data),
    staleTime: 1000 * 60, // 1 minute
    retry: 3,
  });

  if (isLoading) return <Skeleton />;

  if (error) return null;

  return (
    <Select.Root
      defaultValue={task.assignedToUserId || ""}
      onValueChange={(userId) => {
        const assignedToUserId = userId === "Unassigned" ? null : userId;
        axios.patch(`/api/tasks/${task.id}`, {
          assignedToUserId,
        });
      }}
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="Unassigned">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
