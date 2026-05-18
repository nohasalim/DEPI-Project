export interface FormTaskDetails {
  title: string;
  description: string;
  priority: string;
  state: string;
  phase: string;
}

export interface TaskDetails {
  _id: string;
  projectId: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  state: "backlog" | "in_progress" | "review" | "completed";
  phase: "planning" | "design" | "development" | "testing";
  assignedTo?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Updated
export interface AddingTaskResponse {
  status: string;
  data: TaskDetails;
  message?: string;
}

// Waiting Until check from server response
export interface EditingTaskResponse {
  status: string;
  data: TaskDetails;
  message?: string;
}

export interface AddTaskPayload {
  projectId: string;
  taskData: FormTaskDetails;
}

export interface EditTaskPayload {
  projectId: string;
  taskId: string;
  taskData: FormTaskDetails;
}
