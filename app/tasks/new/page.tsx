"use client";
import { TextField, Button } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
//import SimpleMDE from "react-simplemde-editor";
// We need to import like this in cases where components are not compatible with server-side rendering.
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";

interface TaskForm {
  title: string;
  description: string;
}

const NewTaskPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<TaskForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/tasks", data);
        router.push("/tasks");
      })}
    >
      <TextField.Root placeholder="Title" {...register("title")} />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      <Button>Submit New Task</Button>
    </form>
  );
};

export default NewTaskPage;
