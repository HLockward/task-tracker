import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  done: number;
}

const TaskSummary = ({ open, inProgress, done }: Props) => {
  const containers: {
    label: string;
    value: Number;
    status: Status;
  }[] = [
    { label: "Open Tasks", value: open, status: "OPEN" },
    { label: "In-Progress Tasks", value: inProgress, status: "IN_PROGRESS" },
    { label: "Tasks Done", value: done, status: "DONE" },
  ];
  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/tasks?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value.toString()}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default TaskSummary;
