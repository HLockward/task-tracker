import React from "react";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

const Tasks = () => {
  return (
    <div>
      <Button>
        <Link href="/tasks/new">Create Task</Link>
      </Button>
    </div>
  );
};

export default Tasks;
