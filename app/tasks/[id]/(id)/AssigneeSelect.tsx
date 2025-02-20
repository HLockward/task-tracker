"use client";
import Skeleton from "@/app/components/Skeleton";
import { Task, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ task }: { task: Task }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const assignTask = (userId: string) => {
    const assignedToUserId = userId === "Unassigned" ? null : userId;
    axios
      .patch(`/api/tasks/${task.id}`, {
        assignedToUserId,
      })
      .catch(() => {
        toast.error("Failed to assign task");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={task.assignedToUserId || ""}
        onValueChange={assignTask}
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
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/user").then((res) => res.data),
    staleTime: 1000 * 60, // 1 minute
    retry: 3,
  });

export default AssigneeSelect;
