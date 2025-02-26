"use client";
import { TaskStatusBadge } from "@/app/components";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SelectStatus = ({ status, id }: { status: Status; id: number }) => {
  const statuses: { label: string; value: Status }[] = [
    { label: "Open", value: Status.OPEN },
    { label: "In_Progress", value: Status.IN_PROGRESS },
    { label: "Done", value: Status.DONE },
  ];

  const assignStatus = (status: string) => {
    axios
      .patch(`/api/tasks/${id}`, {
        status,
      })
      .catch(() => {
        toast.error("Failed to change status");
      });
  };

  return (
    <>
      <Select.Root defaultValue={status} onValueChange={assignStatus}>
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            {statuses.map((status) => (
              <Select.Item key={status.value} value={status.value}>
                <TaskStatusBadge status={status.value} />
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default SelectStatus;
