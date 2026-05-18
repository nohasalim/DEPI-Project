
import React from "react";
import TaskCard from "./TaskCard";
import type { Task, TaskStatus } from "../../types/task.types";

interface BoardColumnProps {
    title: TaskStatus;
    accent: string;
    tasks: Task[];
    isDarkMode: boolean;
    animatedTaskId: number | null;
    getInitials: (name: string) => string;
    onEdit: (task: Task) => void;
    onDelete: (taskId: number) => void;
}

const BoardColumn: React.FC<BoardColumnProps> = ({
    title,
    accent,
    tasks,
    isDarkMode,
    animatedTaskId,
    getInitials,
    onEdit,
    onDelete,
}) => {
    return (
        <div
            className={`rounded-xl p-3 ${isDarkMode ? "bg-slate-950" : "bg-slate-50"
                }`}
        >
            <div
                className={`mb-3 border-b pb-2 ${isDarkMode ? "border-slate-800" : "border-slate-200"
                    }`}
            >
                <div className="mb-2 flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${accent}`} />

                    <h3
                        className={
                            isDarkMode
                                ? "text-sm font-semibold text-slate-200"
                                : "text-sm font-semibold text-slate-800"
                        }
                    >
                        {title}
                    </h3>

                    <span
                        className={
                            isDarkMode ? "text-xs text-slate-400" : "text-xs text-slate-500"
                        }
                    >
                        {tasks.length}
                    </span>
                </div>

                <div className={`h-1 w-full rounded-full ${accent}`} />
            </div>

            {tasks.length === 0 ? (
                <div
                    className={`flex h-52 items-center justify-center rounded-lg border border-dashed ${isDarkMode
                        ? "border-slate-700 bg-slate-900"
                        : "border-slate-300 bg-white"
                        }`}
                >
                    <p
                        className={
                            isDarkMode ? "text-sm text-slate-500" : "text-sm text-slate-400"
                        }
                    >
                        No tasks yet
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            isDarkMode={isDarkMode}
                            animatedTaskId={animatedTaskId}
                            getInitials={getInitials}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BoardColumn;