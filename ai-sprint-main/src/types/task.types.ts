export type TaskStatus = "Backlog" | "In Progress" | "Review" | "Completed";
export type TaskPhase = "Planning" | "Design" | "Development" | "Testing";
export type TaskPriority = "high" | "medium" | "low";

export interface FormTaskDetails {
  title: string;
  description: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  phase?: TaskPhase;
}

export interface TaskDetails {
  _id: string;
  projectId: string;
  title: string;
  description: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  phase?: TaskPhase;
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


// export interface Task {
//   _id: number;
//   title: string;
//   description: string;
//   status: TaskStatus;
//   assignedTo?: string;
//   createdAt: string;
// }