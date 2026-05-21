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
  console.log("Invite response:", response.data);
  return response.data;
};
export const getTeamMembers = async (projectId: string) => {
  const response = await api.get(`/api/v1/teamMembers/${projectId}`);
  console.log("Team members response:", response.data);
  return response.data;
};