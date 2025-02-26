import { Status } from "@prisma/client";
import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(65535),
});

export const patchTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  status: z.nativeEnum(Status).optional(),
  assignedToUserId: z
    .string()
    .min(1, "Assigned to user is required")
    .max(255)
    .optional()
    .nullable(),
});
