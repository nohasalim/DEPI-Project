import type { TaskDetails } from "./task.types";

export type ProjectStatus = "active" | "completed" | "archived";

export interface Project {
  _id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  icon: string;
  iconBgColor: string;
  teamMembers: number;
  taskCount: number;
  date: string;
}

// Updated
export interface FormGenerateProjectDetails {
  projectName: string;
  description: string;
}

export interface FormEditProjectDetails {
  name: string;
  description: string;
}

export interface ProjectDetails {
  _id: string;
  name: string;
  description: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  tasks?: TaskDetails[];
}

// Updated
export interface AIGeneratingTasksResponse {
  status: string;
  data: ProjectDetails;
  message?: string;
}

export interface EditProjectResponse {
  status: string;
  data: ProjectDetails;
  message?: string;
}

export interface EditProjectPayload {
  projectId: string;
  projectData: FormEditProjectDetails;
}
export interface DeleteProjectResponse {
  status: string;
  message: string;
}