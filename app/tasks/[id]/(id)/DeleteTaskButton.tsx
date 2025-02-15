"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteTaskButton = ({ taskId }: { taskId: number }) => {
  const router = useRouter();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Task</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Confirm deletion</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to delete this task? This action cannot be
          undone .
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={async () => {
                await axios.delete(`/api/tasks/${taskId}`);
                router.push("/tasks");
              }}
            >
              Delete Task
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteTaskButton;
