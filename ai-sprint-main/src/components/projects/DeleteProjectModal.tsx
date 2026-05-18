import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import { closeModal } from "../../features/modal/modalSlice";

import {
    deleteProject,
} from "../../features/projects/projectsActions";

import {
    resetDeleteProjectState,
} from "../../features/projects/projectsSlice";

import LoadingModal from "../modal/LoadingModal";
import SuccessModal from "../modal/SuccessModal";
import ErrorModal from "../modal/ErrorModal";
import ModalHeader from "../modal/ModalHeader";
import ModalFooter from "../modal/ModalFooter";

import { RiDeleteBin6Line } from "react-icons/ri";

interface DeleteProjectModalProps {
    projectName: string;
    projectId: string;
}

export default function DeleteProjectModal({
    projectName,
    projectId,
}: DeleteProjectModalProps) {
    console.log("DeleteProjectModal rendered with projectId:", projectId, "and projectName:", projectName); // Check console log Here
    const dispatch = useAppDispatch();

    const {
        isDeleting,
        isDeletingSuccess,
        deleteErrorMsg,
    } = useAppSelector((state) => state.projects);

    const handleDelete = async () => {
        console.log("Delete button clicked for projectId:", projectId); // Check console log Here
        if (!projectId) return;

        try {
            await dispatch(deleteProject(projectId)).unwrap();

        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = useCallback(() => {
        dispatch(resetDeleteProjectState());
        dispatch(closeModal());
    }, [dispatch]);

    useEffect(() => {
        if (!isDeletingSuccess) return;

        const timer = setTimeout(() => {
            handleClose();
        }, 1000);

        return () => clearTimeout(timer);
    }, [isDeletingSuccess, handleClose]);

    useEffect(() => {
        if (!deleteErrorMsg) return;

        const timer = setTimeout(() => {
            handleClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [deleteErrorMsg, handleClose]);

    return (
        <>
            {/* Modal Header */}
            <ModalHeader
                title="Delete Project"
                icon={<RiDeleteBin6Line />}
                subtitle="This action cannot be undone."
            />

            {/* Modal Content */}
            <div className="w-full p-4 bg-white flex items-center justify-center">
                {isDeleting ? (
                    <LoadingModal
                        title="Deleting Project..."
                        description="Please wait while we remove your project."
                        steps={[
                            "Removing project data.",
                            "Deleting associated tasks.",
                            "Finalizing deletion.",
                        ]}
                    />
                ) : isDeletingSuccess ? (
                    <SuccessModal
                        title="Project Deleted Successfully!"
                        description="Your project has been removed successfully."
                    />
                ) : deleteErrorMsg ? (
                    <ErrorModal
                        title="Project Deletion Failed!"
                        errorMessage={deleteErrorMsg}
                    />
                ) : (
                    <div className="w-full flex flex-col gap-6">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Are you sure?
                            </h3>

                            <p className="text-sm text-gray-600">
                                Deleting {projectName} project will permanently remove
                                all associated data and tasks.
                            </p>
                        </div>

                        <ModalFooter
                            label="Delete Project"
                            icon={<RiDeleteBin6Line />}
                            disabled={isDeleting}
                            onConfirm={handleDelete}
                            onCancel={() => dispatch(closeModal())}
                        />
                    </div>
                )}
            </div>
        </>
    );
}