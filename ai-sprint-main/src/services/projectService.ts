import api from "./api";
import type {
  Project,
  FormGenerateProjectDetails,
  FormEditProjectDetails,
  AIGeneratingTasksResponse,
  EditProjectResponse,
  ProjectStatus,
  DeleteProjectResponse
} from "../types/project.types";

interface BackendProject {
  _id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
}

const mapStatus = (status: string): ProjectStatus => {
  const normalizedStatus = status?.toLowerCase();
  if (
    normalizedStatus === "active" ||
    normalizedStatus === "completed" ||
    normalizedStatus === "archived"
  ) {
    return normalizedStatus;
  }
  return "active";
};

export const projectService = {
  // Get all projects
  async getProjects(): Promise<Project[]> {
    const response = await api.get<{ status: string; data: BackendProject[] }>(
      "/api/v1/projects",
    );
    return response.data.data.map((project) => ({
      _id: project._id,
      name: project.name,
      description: project.description,
      status: mapStatus(project.status),
      progress: 0,
      icon: "📊",
      iconBgColor: "bg-purple-500",
      teamMembers: 0,
      taskCount: 0,
      date: new Date(project.createdAt)
        .toLocaleDateString("en-US", {
          year: "2-digit",
          month: "short",
          day: "numeric",
        })
        .replace(/\//g, " "),
    }));
  },

  // Create new project
  // async createProject(project: Omit<Project, "id" | "date">): Promise<Project> {
  //   const response = await api.post<{ status: string; data: BackendProject }>(
  //     "/api/v1/projects",
  //     {
  //       projectName: project.name,
  //       description: project.description,
  //     },
  //   );
  //   return {
  //     _id: response.data.data._id,
  //     name: project.name,
  //     description: project.description,
  //     status: project.status,
  //     progress: project.progress,
  //     icon: project.icon,
  //     iconBgColor: project.iconBgColor,
  //     teamMembers: project.teamMembers,
  //     taskCount: project.taskCount,
  //     date: new Date()
  //       .toLocaleDateString("en-US", {
  //         year: "2-digit",
  //         month: "short",
  //         day: "numeric",
  //       })
  //       .replace(/\//g, " "),
  //   };
  // },

  // Get project by ID
  async getProjectById(id: string): Promise<Project> {
    const response = await api.get<{ status: string; data: BackendProject }>(
      `/api/v1/projects/${id}`,
    );
    const project = response.data.data;
    return {
      _id: project._id,
      name: project.name,
      description: project.description,
      status: mapStatus(project.status),
      progress: 0,
      icon: "📊",
      iconBgColor: "bg-purple-500",
      teamMembers: 0,
      taskCount: 0,
      date: new Date(project.createdAt)
        .toLocaleDateString("en-US", {
          year: "2-digit",
          month: "short",
          day: "numeric",
        })
        .replace(/\//g, " "),
    };
  },

  // Update project
  // async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
  //   const response = await api.patch<{ status: string; data: BackendProject }>(
  //     `/api/v1/projects/${id}`,
  //     updates,
  //   );
  //   const project = response.data.data;
  //   return {
  //     _id: project._id,
  //     name: project.name,
  //     description: project.description,
  //     status: mapStatus(project.status),
  //     progress: updates.progress || 0,
  //     icon: updates.icon || "📊",
  //     iconBgColor: updates.iconBgColor || "bg-purple-500",
  //     teamMembers: updates.teamMembers || 0,
  //     taskCount: updates.taskCount || 0,
  //     date: new Date(project.createdAt)
  //       .toLocaleDateString("en-US", {
  //         year: "2-digit",
  //         month: "short",
  //         day: "numeric",
  //       })
  //       .replace(/\//g, " "),
  //   };
  // },

}

// Delete project
export const deleteProject = async (projectId: string,
): Promise<DeleteProjectResponse> => {
  const response = await api.delete(`/api/v1/projects/${projectId}`);
  return response.data;
};
export const aiGenerateProjectTasks = async (
  projectData: FormGenerateProjectDetails,
): Promise<AIGeneratingTasksResponse> => {
  // Origingal Respone => Axios Response
  const response = await api.post("/api/v1/projects", projectData);
  // Return our BackEnd Response with interface AIGeneratingTasksResponse
  return response.data;
};

export const editProject = async (
  projectId: string,
  projectData: FormEditProjectDetails,
): Promise<EditProjectResponse> => {
  console.log("Editing project with ID:", projectId, "and data:", projectData); // Check console log Here
  // Origingal Respone => Axios Response
  const response = await api.patch(`/api/v1/projects/${projectId}`, projectData);
  // Return our BackEnd Response with interface AIGeneratingTasksResponse
  return response.data;
};
