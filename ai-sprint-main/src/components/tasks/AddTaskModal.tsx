import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { addingTask } from "../../features/tasks/tasksActions";
import { closeModal } from "../../features/modal/modalSlice";
import { resetTaskState } from "../../features/tasks/tasksSlice";
import { FaPlus } from "react-icons/fa6";
import { type TaskFormData, taskSchema } from "./taskSchema";
import Form from "../common/forms/Form";
import FormInput from "../common/forms/FormInput";
import FormTextArea from "../common/forms/FormTextarea";
import FormSelect from "../common/forms/FormSelect";
import LoadingModal from "../modal/LoadingModal";
import SuccessModal from "../modal/SuccessModal";
import ErrorModal from "../modal/ErrorModal";
import ModalHeader from "../modal/ModalHeader";
import ModalFooter from "../modal/ModalFooter";

interface AddTaskModalProps {
  projectData: { projectId: string; projectName: string };
}

export default function AddTaskModal({ projectData }: AddTaskModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    mode: "onBlur",
    resolver: zodResolver(taskSchema),
  });

  const dispatch = useAppDispatch();
  const {
    isLoading: isAdding,
    isSuccess: isAddingSuccess,
    errorMsg,
  } = useAppSelector((state) => state.task);

  const onSubmit = async (data: TaskFormData) => {
    await dispatch(
      addingTask({ projectId: projectData.projectId, taskData: data }),
    );
  };

  const handleClose = () => {
    dispatch(closeModal());
    reset();
    dispatch(resetTaskState());
  };

  useEffect(() => {
    if (isAddingSuccess) {
      setTimeout(() => {
        handleClose();
      }, 1000);
    }
  }, [isAddingSuccess]);

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
        title="add new task"
        icon={<FaPlus />}
        subtitle={`Project name: ${projectData.projectName}`}
      />
      {/* Modal Content */}
      <div className="w-full p-4 bg-white flex items-center justify-center">
        {isAdding ? (
          <LoadingModal
            title="Adding Task..."
            description="We are analyzing your task details and creating the task."
            steps={[
              "Understanding task requirements",
              "Structuring task details.",
              "Adding task to your project.",
            ]}
          />
        ) : isAddingSuccess ? (
          <SuccessModal
            title="Task Added Successfully!"
            description="Added task for your project."
          />
        ) : errorMsg ? (
          <ErrorModal title="Adding Task Is Failed!" errorMessage={errorMsg} />
        ) : (
          <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
            <FormInput
              label="Task Title"
              name="title"
              register={register}
              error={errors.title}
              placeholder="e.g., Develop admin dashboard"
            />
            <FormTextArea
              label="Task Description"
              name="description"
              register={register}
              error={errors.description}
              placeholder="Describe what you want to achieve with this task..."
              helperText="Be specific about your goals for better AI task generation."
            />
            <FormSelect
              label="Priority"
              name="priority"
              register={register}
              error={errors.priority}
              options={[
                { label: "High", value: "high" },
                { label: "Medium", value: "medium" },
                { label: "Low", value: "low" },
              ]}
              placeholder="Select priority"
            />
            <FormSelect
              label="State"
              name="state"
              register={register}
              error={errors.state}
              options={[
                { label: "Backlog", value: "backlog" },
                { label: "In Progress", value: "in_progress" },
                { label: "Review", value: "review" },
                { label: "Completed", value: "completed" },
              ]}
              placeholder="Select state"
            />
            <FormSelect
              label="Phase"
              name="phase"
              register={register}
              error={errors.phase}
              options={[
                { label: "Planning", value: "planning" },
                { label: "Designs", value: "design" },
                { label: "Development", value: "development" },
                { label: "Testing", value: "testing" },
              ]}
              placeholder="Select phase"
            />

            <ModalFooter
              label="Add Task"
              icon={<FaPlus />}
              disabled={isAdding}
              onClick={handleClose}
            />
          </Form>
        )}
      </div>
    </>
  );
}
