import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import { closeModal } from "../../features/modal/modalSlice";

import { deletingTask } from "../../features/tasks/tasksActions";
import { resetTaskState } from "../../features/tasks/tasksSlice";

import LoadingModal from "../modal/LoadingModal";
import SuccessModal from "../modal/SuccessModal";
import ErrorModal from "../modal/ErrorModal";
import ModalHeader from "../modal/ModalHeader";
import ModalFooter from "../modal/ModalFooter";

import { RiDeleteBin6Line } from "react-icons/ri";
interface DeleteTaskModalProps {
    taskId: string;
    taskTitle: string;
    projectId: string;
}

export default function DeleteTaskModal({
    taskId,
    taskTitle,
    projectId,
}: DeleteTaskModalProps) {

    const dispatch = useAppDispatch();

    const {
        isLoading,
        isSuccess,
        errorMsg,
    } = useAppSelector((state) => state.task);

    const handleDelete = async () => {
        if (!taskId || !projectId) return;

        try {
            await dispatch(
                deletingTask({
                    projectId,
                    taskId,
                })
            ).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = useCallback(() => {
        dispatch(resetTaskState());
        dispatch(closeModal());
    }, [dispatch]);

    useEffect(() => {
        if (!isSuccess) return;

        const timer = setTimeout(() => {
            handleClose();
        }, 1000);

        return () => clearTimeout(timer);
    }, [isSuccess, handleClose]);

    useEffect(() => {
        if (!errorMsg) return;

        const timer = setTimeout(() => {
            handleClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [errorMsg, handleClose]);

    return (
        <>
            {/* Header */}
            <ModalHeader
                title="Delete Task"
                icon={<RiDeleteBin6Line />}
                subtitle="This action cannot be undone."
            />

            {/* Content */}
            <div className="w-full p-4 bg-white flex items-center justify-center">
                {isLoading ? (
                    <LoadingModal
                        title="Deleting Task..."
                        description="Please wait while we remove your task."
                        steps={[
                            "Removing task data.",
                            "Updating project board.",
                            "Finalizing deletion.",
                        ]}
                    />
                ) : isSuccess ? (
                    <SuccessModal
                        title="Task Deleted Successfully!"
                        description="Your task has been removed successfully."
                    />
                ) : errorMsg ? (
                    <ErrorModal
                        title="Task Deletion Failed!"
                        errorMessage={errorMsg}
                    />
                ) : (
                    <div className="w-full flex flex-col gap-6">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Are you sure?
                            </h3>

                            <p className="text-sm text-gray-600">
                                Deleting <b>{taskTitle}</b> will permanently remove it
                                from your project board.
                            </p>
                        </div>

                        <ModalFooter
                            label="Delete Task"
                            icon={<RiDeleteBin6Line />}
                            disabled={isLoading}
                            onConfirm={handleDelete}
                            onCancel={handleClose}
                        />
                    </div>
                )}
            </div>
        </>
    );
}