// import { createAsyncThunk } from "@reduxjs/toolkit";
// import * as invitationService from "../../services/invitationService";
// import type { FormInvitationDetails } from "../../types/invitation.types";

// export const inviteTeamMember = createAsyncThunk(
//   "invite/inviteTeamMember",
//   async (inviteData: FormInvitationDetails, { rejectWithValue }) => {
//     try {
//       const { status, data, message } =
//         await invitationService.invite(inviteData);

//       if (status !== "success") {
//         // Check console log Here
//         console.log(status);
//         return rejectWithValue(message || "Invitation is failed");
//       }
//       return data;
//     } catch (error: unknown) {
//       // Check console log Here
//       console.log(error);
//       type AxiosErrorLike = { response?: { data?: { message?: unknown } } };
//       const axiosErr = error as AxiosErrorLike;
//       const messageFromResponse =
//         axiosErr.response &&
//           axiosErr.response.data &&
//           typeof axiosErr.response.data.message === "string"
//           ? axiosErr.response.data.message
//           : undefined;
//       const message =
//         messageFromResponse ?? (error instanceof Error ? error.message : undefined) ??
//         "Something went wrong while inviting team member";
//       return rejectWithValue(message);
//     }
//   },
// );
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as invitationService from "../../services/invitationService";
import type { FormInvitationDetails } from "../../types/invitation.types";

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