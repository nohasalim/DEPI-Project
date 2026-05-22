
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as invitationService from "../../services/invitationService";
import type { FormInvitationDetails } from "../../types/invitation.types";
import type { TeamMember } from "../../types/invitation.types";
export const inviteTeamMember = createAsyncThunk(
  "invite/inviteTeamMember",
  async (
    {
      projectId,
      inviteData,
    }: {
      projectId: string;
      inviteData: FormInvitationDetails;
    },
    { rejectWithValue },
  ) => {
    try {
      const { status, data, message } =
        await invitationService.invite(projectId, inviteData);
      console.log("Invite response in thunk:", { status, data, message });

      if (status !== "success") {
        return rejectWithValue(message || "Invitation failed");
      }

      return data;
    } catch (error: unknown) {
      type AxiosErrorLike = {
        response?: {
          data?: {
            message?: unknown;
          };
        };
      };

      const axiosErr = error as AxiosErrorLike;

      const messageFromResponse =
        typeof axiosErr.response?.data?.message === "string"
          ? axiosErr.response.data.message
          : undefined;

      const message =
        messageFromResponse ??
        (error instanceof Error ? error.message : undefined) ??
        "Something went wrong while inviting team member";

      return rejectWithValue(message);
    }
  }
);

export const getTeamMembers = createAsyncThunk<
  TeamMember[],
  string,
  { rejectValue: string }
>(
  "team/getTeamMembers",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await invitationService.getTeamMembers(projectId);

      const members = response?.members;

      if (!members) {
        return rejectWithValue("No team members found");
      }

      return members;
    } catch {
      return rejectWithValue("Failed to load team members");
    }
  }
);