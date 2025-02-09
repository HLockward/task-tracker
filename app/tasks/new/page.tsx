"use client";
import { TextField, Button } from "@radix-ui/themes";
//import SimpleMDE from "react-simplemde-editor";
// We need to import like this in cases where components are not compatible with server-side rendering.
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";

const NewTaskPage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title" />
      <SimpleMDE placeholder="Description" />
      <Button>Submit New Task</Button>
    </div>
  );
};

export default NewTaskPage;
