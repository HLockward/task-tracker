import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import TaskStatusFilter from "./TaskStatusFilter";

const TaskActions = () => {
  return (
    <Flex mb="5" justify="between">
      <TaskStatusFilter />
      <Button>
        <Link href="/tasks/new">Create Task</Link>
      </Button>
    </Flex>
  );
};

export default TaskActions;
