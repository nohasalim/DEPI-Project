// src/components/tasks/TasksToolbar.tsx

import React from "react";
import type { TaskStatus } from "../../types/task.types";

interface TasksToolbarProps {
    isDarkMode: boolean;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    statusFilter: "All" | TaskStatus;
    setStatusFilter: React.Dispatch<
        React.SetStateAction<"All" | TaskStatus>
    >;
    setIsAddingTask: React.Dispatch<
        React.SetStateAction<boolean>
    >;
}

const boardColumns: TaskStatus[] = [
    "Backlog",
    "In Progress",
    "Review",
    "Done",
];

const TasksToolbar: React.FC<TasksToolbarProps> = ({
    isDarkMode,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    setIsAddingTask,
}) => {
    return (
        <section
            className={`mb-6 rounded-2xl p-5 shadow-sm ${isDarkMode
                    ? "border border-slate-800 bg-slate-900"
                    : "border border-slate-200 bg-white"
                }`}
        >
            <div className="flex flex-wrap items-center justify-between gap-3">

                {/* Filters */}
                <div className="flex items-center gap-3">

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(
                                event.target.value as "All" | TaskStatus,
                            )
                        }
                        className={`rounded-lg px-3 py-2 text-sm outline-none ${isDarkMode
                                ? "border border-slate-700 bg-slate-900 text-slate-200"
                                : "border border-slate-200 bg-white text-slate-700"
                            }`}
                    >
                        <option value="All">All</option>

                        {boardColumns.map((column) => (
                            <option key={column} value={column}>
                                {column}
                            </option>
                        ))}
                    </select>

                    {/* Search */}
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(event.target.value)
                        }
                        placeholder="Search tasks..."
                        aria-label="Search tasks"
                        className={`rounded-lg px-3 py-2 text-sm outline-none ${isDarkMode
                                ? "border border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500"
                                : "border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
                            }`}
                    />
                </div>

                {/* Add Task Button */}
                <button
                    onClick={() =>
                        setIsAddingTask((previous) => !previous)
                    }
                    className="rounded-xl bg-linear-to-r from-violet-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                >
                    + New Task
                </button>
            </div>
        </section>
    );
};

export default TasksToolbar;