import api from "./api";
import type {
  FormTaskDetails,
  AddingTaskResponse,
  EditingTaskResponse,
} from "../types/task.types";

export const addingTask = async (
  projectId: string,
  taskData: FormTaskDetails,
): Promise<AddingTaskResponse> => {
  const response = await api.post(`/api/v1/tasks/${projectId}`, taskData);
  return response.data;
};

export const editingTask = async (
  taskId: string,
  taskData: FormTaskDetails,
): Promise<EditingTaskResponse> => {
  const response = await api.patch(`/api/v1/tasks/${taskId}`, taskData);
  return response.data;
};

// export const editingTask = async (
//   projectId: string,
//   taskId: string,
//   taskData: FormTaskDetails,
// ): Promise<EditingTaskResponse> => {
//   const response = await api.patch(
//     `/tasks/${taskId}`,
//     taskData,
//   );
//   return response.data;
// };
