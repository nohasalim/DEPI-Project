import { z } from "zod";
export const taskSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 chars!"),
  description: z.string().min(25, "Description must be at least 25 chars"),
  priority: z.enum(["high", "medium", "low"], {
    message: "Priority is High or Medium or Low",
  }),
  state: z.enum(["backlog", "in_progress", "review", "completed"], {
    message: "State is Backlog or In Progress or Review or Completed",
  }),
  phase: z.enum(["planning", "design", "development", "testing"], {
    message: "Phase is Planning or Design or Development or Testing",
  }),
});

export type TaskFormData = z.infer<typeof taskSchema>;
