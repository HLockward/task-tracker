"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { taskSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
//import SimpleMDE from "react-simplemde-editor";
// We need to import like this in cases where components are not compatible with server-side rendering.
import { Task } from "@prisma/client";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type TaskFormData = z.infer<typeof taskSchema>;

const TaskForm = ({ task }: { task?: Task }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      if (task) await axios.patch(`/api/tasks/${task.id}`, data);
      else await axios.post("/api/tasks", data);
      router.push("/tasks");
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again later.");
      console.log(error);
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-3">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={task?.title}
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={task?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={loading}>
          {task ? "Update task" : "Submit New Task"} {loading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;
