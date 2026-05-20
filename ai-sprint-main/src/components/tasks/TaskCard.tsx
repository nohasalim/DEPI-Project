
import React from "react";
import type { Task } from "../../types/task.types";

interface TaskCardProps {
    task: Task;
    animatedTaskId: number | null;
    getInitials: (name: string) => string;
    onEdit: (task: Task) => void;
    onDelete: (taskId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
    task,
    animatedTaskId,
    onEdit,
    onDelete,
}) => {
    return (
        <article
            className={`rounded-lg border p-3 border-slate-200 bg-white transition-all duration-500 ${animatedTaskId === task._id
                ? "scale-105 ring-2 ring-violet-400 shadow-lg"
                : ""
                }`}
        >
            <h4
                className={"text-sm font-semibold text-slate-800"}
            >
                {task.title}
            </h4>

            <p
                className={
                    "mt-2 text-xs text-slate-500"
                }
            >
                {task.description || "No description"}
            </p>

            {/* <div className="mt-2 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-500 text-[10px] font-semibold text-white">
                    {getInitials(task?.assignedTo)}
                </span>

                <p
                    className={
                        "text-xs text-slate-600"
                    }
                >
                    {task?.assignedTo}
                </p>
            </div> */}

            <div className="mt-3 flex items-center gap-2">
                <button
                    onClick={() => onEdit(task)}
                    className={`rounded px-2 py-1 text-xs font-medium 
                       border border-slate-300 text-slate-700 hover:bg-slate-100
                      `}
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(task._id)}
                    className="rounded border border-rose-300 px-2 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50"
                >
                    Delete
                </button>
            </div>
        </article>
    );
};

export default TaskCard;