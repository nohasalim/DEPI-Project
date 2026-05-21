import type { ProjectDetails } from "./project.types";
import type { TaskDetails } from "./task.types";

export type ModalDataMap = {
  generateProject: undefined;
  addTask: { projectId: string; projectName: string };
  editTask: TaskDetails;
  deleteTask: { taskId: string; taskTitle: string; projectId: string };
  editProject: ProjectDetails;
  deleteProject: {
    _id: string;
    name: string;
  };

  inviteTeamMember: { projectId: string, projectName: string };
};

export type OpenModalPayload = {
  [T in keyof ModalDataMap]: ModalDataMap[T] extends undefined
  ? { name: T }
  : { name: T; data: ModalDataMap[T] };
}[keyof ModalDataMap];
