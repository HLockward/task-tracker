"use client";
import TaskFormSkeleton from "@/app/tasks/_components/TaskFormSkeleton";
import dynamic from "next/dynamic";
const TaskForm = dynamic(() => import("@/app/tasks/_components/TaskForm"), {
  ssr: false,
  loading: () => <TaskFormSkeleton />,
});

const NewTaskPage = () => {
  return <TaskForm />;
};

export default NewTaskPage;
