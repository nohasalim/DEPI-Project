import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { closeModal } from "../../features/modal/modalSlice";
import AddTaskModal from "../tasks/AddTaskModal";
import EditTaskModal from "../tasks/EditTaskModal";
import CreateProjectModal from "../projects/CreateProjectModal";
import EditProjectModal from "../projects/EditProjectModal";
import InvitationModal from "../invitation/InvitationModal";
import DeleteProjectModal from "../projects/DeleteProjectModal";

export default function Modal() {
  const dispatch = useAppDispatch();
  const { isOpen, componentName, data } = useAppSelector(
    (state) => state.modal,
  );
  const {
    isLoading: isTaskLoading,
    isSuccess: isTaskSuccess,
    errorMsg: taskErrorMsg,
  } = useAppSelector((state) => state.task);
  const {
    isGenerating,
    isEditing,
    isGeneratingSuccess,
    isEditingSuccess,
    generateErrorMsg,
    editErrorMsg,
  } = useAppSelector((state) => state.projects);
  const {
    isloading: isInvitationLoading,
    isSuccess: isInvitationSuccess,
    errorMsg: invitationErrorMsg,
  } = useAppSelector((state) => state.invite);
  let renderComponent;

  switch (componentName) {
    case "generateProject":
      renderComponent = <CreateProjectModal />;
      break;
    case "addTask":
      if (data && "projectName" in data) {
        renderComponent = <AddTaskModal projectData={data} />;
      }
      break;
    case "editTask":
      if (data && "priority" in data) {
        renderComponent = <EditTaskModal taskDetails={data} />;
      }
      break;
    case "editProject":
      if (data && "name" in data) {
        renderComponent = <EditProjectModal projectDetails={data} />;
      }
      break;
    case "deleteProject":
      if (data && "_id" in data) {
        renderComponent = <DeleteProjectModal projectId={data._id} projectName={data.name} />;
      }
      break;
    case "inviteTeamMember":
      renderComponent = <InvitationModal />;
      break;
    default:
      renderComponent = null;
  }

  const handleClose = () => {
    if (
      !isTaskLoading &&
      !isTaskSuccess &&
      !taskErrorMsg &&
      !isEditing &&
      !isGenerating &&
      !isEditingSuccess &&
      !isGeneratingSuccess &&
      !generateErrorMsg &&
      !editErrorMsg &&
      !isInvitationLoading &&
      !isInvitationSuccess &&
      !invitationErrorMsg
    )
      dispatch(closeModal());
  };

  return (
    <>
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black/50 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
      ></div>
      <div
        className={`rounded-lg shadow-sm overflow-hidden absolute z-10 top-1/2 left-1/2 transform -translate-1/2 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        {renderComponent}
      </div>
    </>
  );
}
