
import React from "react";
import type { TaskStatus } from "../../types/task.types";
import { openModal } from "../../features/modal/modalSlice";
import { useDispatch } from "react-redux";

interface TasksToolbarProps {
    searchTerm: string;
    projectId?: string;
    projectName?: string;
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
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    projectId,
    projectName,

}) => {
    const dispatch = useDispatch();
    return (
        <section
            className={`mb-6 rounded-2xl p-5 shadow-sm border border-slate-200 bg-white`}
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
                        className={`rounded-lg px-3 py-2 text-sm outline-none border border-slate-200 bg-white text-slate-700`}
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
                        className={`rounded-lg px-3 py-2 text-sm outline-none 
                          border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400`}
                    />
                </div>

                {/* Add Task Button */}

                <button

                    onClick={() => dispatch(openModal({ name: "addTask", data: { projectId, projectName } }))}

                    className="rounded-xl bg-linear-to-r from-violet-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 cursor-pointer"
                >
                    + New Task
                </button>
            </div>
        </section>
    );
};

export default TasksToolbar;