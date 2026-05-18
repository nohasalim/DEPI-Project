import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { z } from "zod";
import { inviteTeamMember } from "../../features/invitation/invitationActions";
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
  email: z.string().email("Invalid email address"),
});

type InvitationFormData = z.infer<typeof invitationSchema>;

const InvitationModal = () => {
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
    await dispatch(inviteTeamMember(data));
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
        subtitle={`Send an invitation to join the Architectural Studio workspace`}
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
            <ModalFooter
              label="Send Invitation"
              disabled={isInviting}
              onClick={() => dispatch(closeModal())}
            />
          </Form>
        )}
      </div>
    </>
  );
};

export default InvitationModal;
