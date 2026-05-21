
import React from "react";
import type { TaskDetails } from "../../types/task.types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { openModal } from "../../features/modal/modalSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
interface TaskCardProps {
    mainProjectId: string;
    task: TaskDetails;

}

const TaskCard: React.FC<TaskCardProps> = ({
    mainProjectId,
    task,
}) => {
    const dispatch = useAppDispatch();
    return (
        <article
            className={`rounded-lg border p-3 border-slate-200 bg-white transition-all duration-500 hover:shadow-md cursor-pointer`}
        >
            <h4
                className={"text-sm font-semibold text-slate-800"}
            >
                {task.title}
            </h4>

            <p
                className={
                    "mt-2 mb-2 text-xs text-slate-500"
                }
            >
                {task.description || "No description"}
            </p>
            {/* Footer */}
            <div className="flex items-center justify-between  pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-4">

                        <div className="flex items-center gap-1">
                            <MdOutlineDateRange />
                            <span>{task.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                className="cursor-pointer"
                                onClick={() => {
                                    dispatch(
                                        openModal({
                                            name: "deleteTask",
                                            data: {
                                                taskId: task._id,
                                                taskTitle: task.title,
                                                projectId: mainProjectId,
                                            },
                                        })
                                    );
                                }
                                }>
                                <RiDeleteBin6Line className="text-black" />                </button>
                            <button
                                className="cursor-pointer"
                                onClick={() =>
                                    dispatch(
                                        openModal({
                                            name: "editTask",
                                            data: {
                                                projectId: mainProjectId,
                                                _id: task._id,
                                                title: task.title,
                                                description: task.description,
                                                priority: task.priority,
                                                status: task.status,
                                                phase: task.phase,
                                            },
                                        }),
                                    )
                                }>
                                <FaRegEdit />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </article>
    );
};

export default TaskCard;