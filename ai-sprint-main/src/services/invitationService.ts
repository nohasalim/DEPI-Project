import api from "./api";
import type {
  InviteResponse,
  FormInvitationDetails,
} from "../types/invitation.types";

export const invite = async (
  inviteData: FormInvitationDetails,
): Promise<InviteResponse> => {
  const response = await api.post(`/api/v1/teamMembers/invite`, inviteData);
  return response.data;
};
