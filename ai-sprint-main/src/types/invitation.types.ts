export interface TeamMember {
  _id: string;
  email: string;
}
export interface InviteResponse {
  status: string;
  data: string;
  message?: string;
}

export interface FormInvitationDetails {
  name: string;
  email: string;
}
