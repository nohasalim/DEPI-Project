import api from "./api";
import type {
  InviteResponse,
  FormInvitationDetails,
} from "../types/invitation.types";

export const invite = async (
  projectId: string,
  inviteData: FormInvitationDetails
): Promise<InviteResponse> => {
  const response = await api.post(`/api/v1/teamMembers/${projectId}/invite`, inviteData);
  return response.data;
};
export const getTeamMembers = async (projectId: string) => {
  const response = await api.get(`/api/v1/teamMembers/${projectId}`);
  return response.data;
};