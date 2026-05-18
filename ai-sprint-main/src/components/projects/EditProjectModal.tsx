import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { editProject } from "../../features/projects/projectsActions";
import { resetEditProjectState } from "../../features/projects/projectsSlice";
import { z } from "zod";
import { closeModal } from "../../features/modal/modalSlice";
import Form from "../common/forms/Form";
import FormInput from "../common/forms/FormInput";
import FormTextArea from "../common/forms/FormTextarea";
import LoadingModal from "../modal/LoadingModal";
import SuccessModal from "../modal/SuccessModal";
import ErrorModal from "../modal/ErrorModal";
import ModalHeader from "../modal/ModalHeader";
import ModalFooter from "../modal/ModalFooter";
import { FaRegEdit } from "react-icons/fa";
import type { ProjectDetails } from "../../types/project.types";

interface EditProjectModalProps {
  projectDetails: ProjectDetails;
}

const projectSchema = z.object({
  name: z.string().min(10, "Name must be at least 10 chars!"),
  description: z.string().min(25, "Description must be at least 25 chars"),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function EditProjectModal({
  projectDetails,
}: EditProjectModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    mode: "onBlur",
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: projectDetails.name,
      description: projectDetails.description,
    },
  });

  const dispatch = useAppDispatch();
  const { isEditing, isEditingSuccess, editErrorMsg } = useAppSelector(
    (state) => state.projects,
  );

  const onSubmit = async (data: ProjectFormData) => {
    await dispatch(
      editProject({ projectId: projectDetails?._id, projectData: data }),
    );
    console.log("Project edited with ID:", projectDetails?._id, "and data:", data); // Check console log Here
  };

  const handleClose = useCallback(() => {
    reset({
      name: projectDetails.name,
      description: projectDetails.description,
    });

    dispatch(resetEditProjectState());
    dispatch(closeModal());
  }, [dispatch, reset, projectDetails]);

  useEffect(() => {
    if (isEditingSuccess) {
      setTimeout(() => {
        handleClose();
      }, 1000);
    }
  }, [isEditingSuccess, handleClose]);

  useEffect(() => {
    if (editErrorMsg) {
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  }, [editErrorMsg, handleClose]);

  return (
    <>
      {/* Modal Header */}
      <ModalHeader
        title="edit project"
        icon={<FaRegEdit />}
        subtitle={`Project name: ${projectDetails.name}`}
      />
      {/* Modal Content */}
      <div className="w-full p-4 bg-white flex items-center justify-center">
        {isEditing ? (
          <LoadingModal
            title="Editing Project..."
            description="We are analyzing your project details and editing the project."
            steps={[
              "Analyzing project scope.",
              "Identifying key milestones.",
              "Creating task breakdown.",
            ]}
          />
        ) : isEditingSuccess ? (
          <SuccessModal
            title="Project Edited Successfully!"
            description="Your project details have been updated successfully."
          />
        ) : editErrorMsg ? (
          <ErrorModal
            title="Project Editing Failed!"
            errorMessage={editErrorMsg}
          />
        ) : (
          <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
            <FormInput
              label="Project Name"
              name="name"
              register={register}
              error={errors.name}
              placeholder="e.g., E-Commerce Platform"
            />
            <FormTextArea
              label="Project Description"
              name="description"
              register={register}
              error={errors.description}
              placeholder="Describe what you want to achieve with this project..."
              helperText="Be specific about your goals for better project ."
            />

            <ModalFooter
              label="Edit Project"
              icon={<FaRegEdit />}
              disabled={isEditing}
              onConfirm={handleSubmit(onSubmit)}
              onCancel={() => dispatch(closeModal())}

            />
          </Form>
        )}
      </div>
    </>
  );
}
