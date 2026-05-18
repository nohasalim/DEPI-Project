import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { generateProject } from "../../features/projects/projectsActions";
import { resetGenerateProjectState } from "../../features/projects/projectsSlice";
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

const projectSchema = z.object({
  projectName: z.string().min(10, "Name must be at least 10 chars!"),
  description: z.string().min(25, "Description must be at least 25 chars"),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function CreateProjectModal() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    mode: "onBlur",
    resolver: zodResolver(projectSchema),
  });

  const dispatch = useAppDispatch();
  const { isGenerating, isGeneratingSuccess, generateErrorMsg, projectData } =
    useAppSelector((state) => state.projects);

  const numOfProjectTasks = projectData?.tasks?.length;

  const onSubmit = async (data: ProjectFormData) => {
    await dispatch(generateProject(data));
  };

  const handleClose = useCallback(() => {
    dispatch(closeModal());
    reset();
    dispatch(resetGenerateProjectState());
  }, [dispatch, reset]);

  useEffect(() => {
    if (isGeneratingSuccess) {
      setTimeout(() => {
        handleClose();
      }, 1000);
    }
  }, [isGeneratingSuccess, handleClose]);

  useEffect(() => {
    if (generateErrorMsg) {
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  }, [generateErrorMsg, handleClose]);

  return (
    <>
      {/* Modal Header */}
      <ModalHeader
        title="create new project"
        icon={<span className="mr-1 ">✨</span>}
        subtitle={`Let AI help you generate tasks based on your project goal`}
      />
      {/* Modal Content */}
      <div className="w-full p-4 bg-white flex items-center justify-center">
        {isGenerating ? (
          <LoadingModal
            title="Generating Tasks..."
            description="AI is analyzing your project goal and creating tasks."
            steps={[
              "Analyzing project scope.",
              "Identifying key milestones.",
              "Creating task breakdown.",
            ]}
          />
        ) : isGeneratingSuccess ? (
          <SuccessModal
            title="Tasks Generated Successfully!"
            description={`Created ${numOfProjectTasks} tasks for your project.`}
          />
        ) : generateErrorMsg ? (
          <ErrorModal
            title="Tasks Generating Failed!"
            errorMessage={generateErrorMsg}
          />
        ) : (
          <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
            <FormInput
              label="Project Name"
              name="projectName"
              register={register}
              error={errors.projectName}
              placeholder="e.g., E-Commerce Platform"
            />
            <FormTextArea
              label="Project Description"
              name="description"
              register={register}
              error={errors.description}
              placeholder="Describe what you want to achieve with this project..."
              helperText="Be specific about your goals for better AI task generation."
            />

            <ModalFooter
              label="✨ Generate AI Tasks"
              disabled={isGenerating}
              onClick={() => dispatch(closeModal())}
            />
          </Form>
        )}
      </div>
    </>
  );
}
