import { z } from "zod";
export const taskSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 chars!"),
  description: z.string().min(25, "Description must be at least 25 chars"),
  priority: z.enum(["high", "medium", "low"], {
    message: "Priority is High or Medium or Low",
  }),
  status: z.enum(["Backlog", "In Progress", "Review", "Completed"], {
    message: "Status is Backlog or In Progress or Review or Completed",
  }),
  phase: z.enum(["Planning", "Design", "Development", "Testing"], {
    message: "Phase is Planning or Design or Development or Testing",
  }),
});

export type TaskFormData = z.infer<typeof taskSchema>;
