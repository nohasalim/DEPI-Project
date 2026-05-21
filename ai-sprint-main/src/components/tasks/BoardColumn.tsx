
import React from "react";
import TaskCard from "./TaskCard";
import type { TaskDetails, TaskStatus } from "../../types/task.types";

interface BoardColumnProps {
    title: TaskStatus;
    accent: string;
    tasks: TaskDetails[];
    mainProjectId: string;

}

const BoardColumn: React.FC<BoardColumnProps> = ({
    title,
    accent,
    tasks,
    mainProjectId,
}) => {
    return (
        <div
            className={`rounded-xl p-3 bg-slate-50 `}
        >
            <div
                className={`mb-3 border-b pb-2 border-slate-200`}
            >
                <div className="mb-2 flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${accent}`} />

                    <h3
                        className={
                            "text-sm font-semibold text-slate-800"
                        }
                    >
                        {title}
                    </h3>

                    <span
                        className={
                            "text-xs text-slate-500"
                        }
                    >
                        {tasks?.length}
                    </span>
                </div>

                <div className={`h-1 w-full rounded-full ${accent}`} />
            </div>

            {tasks?.length === 0 ? (
                <div
                    className={`flex h-52 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white`}
                >
                    <p
                        className={
                            "text-sm text-slate-400"
                        }
                    >
                        No tasks yet
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    {tasks?.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            mainProjectId={mainProjectId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BoardColumn;