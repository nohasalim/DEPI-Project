import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { z } from "zod";
import { getTeamMembers, inviteTeamMember } from "../../features/invitation/invitationActions";
import { closeModal } from "../../features/modal/modalSlice";
import { resetInvitationState } from "../../features/invitation/invitationSlice";
import Form from "../common/forms/Form";
import FormInput from "../common/forms/FormInput";
import LoadingModal from "../modal/LoadingModal";
import SuccessModal from "../modal/SuccessModal";
import ErrorModal from "../modal/ErrorModal";
import ModalHeader from "../modal/ModalHeader";
import ModalFooter from "../modal/ModalFooter";
import { IoPersonAddOutline } from "react-icons/io5";

const invitationSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email("Invalid email address"),
});

type InvitationFormData = z.infer<typeof invitationSchema>;
interface InvitationModalProps {
  projectName?: string;
  projectId: string;
  data?: {
    name: string;
    email: string;
  };
}

const InvitationModal: React.FC<InvitationModalProps> = ({
  projectName,
  projectId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InvitationFormData>({
    mode: "onBlur",
    resolver: zodResolver(invitationSchema),
  });

  const dispatch = useAppDispatch();
  const {
    isloading: isInviting,
    isSuccess: isInvitingSuccess,
    errorMsg,
  } = useAppSelector((state) => state.invite);

  const onSubmit = async (data: InvitationFormData) => {
    try {
      await dispatch(
        inviteTeamMember({
          projectId,
          inviteData: data,
        })
      ).unwrap();

      // 🔥 refresh team after invite success
      dispatch(getTeamMembers(projectId));

    } catch (error) {
      console.log("Invite failed:", error);
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
    reset();
    dispatch(resetInvitationState());
  };

  useEffect(() => {
    if (isInvitingSuccess) {
      setTimeout(() => {
        handleClose();
      }, 1000);
    }
  }, [isInvitingSuccess]);

  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  }, [errorMsg]);

  return (
    <>
      {/* Modal Header */}
      <ModalHeader
        title="invite team member"
        icon={<IoPersonAddOutline />}
        subtitle={`Send an invitation to join the ${projectName || "Architectural Studio"} workspace`}
      />
      {/* Modal Content */}
      <div className="w-full p-4 bg-white flex items-center justify-center">
        {isInviting ? (
          <LoadingModal
            title="Inviting Team Member..."
            description="We are sharing our work together."
            steps={[
              "Analyzing invitation.",
              "Identifying your team member account.",
              "Sharing your project.",
            ]}
          />
        ) : isInvitingSuccess ? (
          <SuccessModal
            title="Invited Team Member Successfully!"
            description={`Invited new team member to your project.`}
          />
        ) : errorMsg ? (
          <ErrorModal
            title="Invite Team Member Failed!"
            errorMessage={errorMsg}
          />
        ) : (
          <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
            <FormInput
              label="Email Address"
              type="email"
              name="email"
              register={register}
              error={errors.email}
              placeholder="e.g., you@company.com"
            />
            <FormInput
              label="Name"
              type="text"
              name="name"
              register={register}
              error={errors.name}
              placeholder="e.g., John Doe"
            />

            <ModalFooter
              label="Send Invitation"
              disabled={isInviting}
              onConfirm={handleSubmit(onSubmit)}
              onCancel={handleClose} />
          </Form>
        )}
      </div>
    </>
  );
};

export default InvitationModal;
