// src/pages/Tasks.tsx

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import BoardColumn from "../components/tasks/BoardColumn";

import type { Task, TaskStatus } from "../types/task.types";
import TasksToolbar from "../components/tasks/TasksToolbar";
import ProjectOverview from "../components/tasks/ProjectOverview";

const boardColumns: Array<{ title: TaskStatus; accent: string }> = [
    { title: "Backlog", accent: "bg-slate-500" },
    { title: "In Progress", accent: "bg-sky-500" },
    { title: "Review", accent: "bg-purple-500" },
    { title: "Done", accent: "bg-emerald-500" },
];

const Tasks: React.FC = () => {
    const navigate = useNavigate();

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAddingTask, setIsAddingTask] = useState(false);

    const [tasks, setTasks] = useState<Task[]>([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<
        "All" | TaskStatus
    >("All");

    const [animatedTaskId, setAnimatedTaskId] = useState<number | null>(
        null,
    );

    const [members] = useState<string[]>([
        "Noha",
        "Ahmed",
        "Ali",
    ]);

    const [mainProject] = useState({
        name: "AI Sprint Platform",
        description:
            "AI-powered project management and collaboration platform.",
    });

    const visibleTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesSearch =
                task.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                task.details
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesFilter =
                statusFilter === "All" ||
                task.status === statusFilter;

            return matchesSearch && matchesFilter;
        });
    }, [tasks, searchTerm, statusFilter]);

    const tasksByColumn = useMemo(() => {
        return boardColumns.reduce<Record<TaskStatus, Task[]>>(
            (acc, column) => {
                acc[column.title] = visibleTasks.filter(
                    (task) => task.status === column.title,
                );

                return acc;
            },
            {
                Backlog: [],
                "In Progress": [],
                Review: [],
                Done: [],
            },
        );
    }, [visibleTasks]);

    const mainProjectProgress = useMemo(() => {
        const total = tasks.length;

        const completed = tasks.filter(
            (task) => task.status === "Done",
        ).length;

        const percentage =
            total === 0
                ? 0
                : Math.round((completed / total) * 100);

        return {
            total,
            completed,
            percentage,
        };
    }, [tasks]);

    const handleDeleteTask = (taskId: number) => {
        setTasks((previous) =>
            previous.filter((task) => task.id !== taskId),
        );
    };

    const handleOpenEditTask = (task: Task) => {
        console.log(task);
    };

    const getInitials = (name: string) => {
        const words = name.trim().split(/\s+/);

        if (words.length === 1) {
            return words[0].slice(0, 2).toUpperCase();
        }

        return `${words[0][0]}${words[1][0]}`.toUpperCase();
    };

    return (
        <div
            className={`min-h-screen ${isDarkMode
                ? "bg-slate-950 text-slate-100"
                : "bg-slate-50 text-slate-900"
                }`}
        >
            <div className="mx-auto max-w-310 px-6 py-6 lg:px-8">

                {/* Header
                <TasksHeader
                    isDarkMode={isDarkMode}
                    toggleTheme={() =>
                        setIsDarkMode((previous) => !previous)
                    }
                /> */}

                {/* Back Button */}
                <button
                    onClick={() => navigate("/dashboard")}
                    className={`mb-5 text-sm font-medium transition-colors ${isDarkMode
                        ? "text-slate-400 hover:text-slate-200"
                        : "text-slate-500 hover:text-slate-700"
                        }`}
                >
                    ← Back to Dashboard
                </button>

                {/* Project Overview */}
                <ProjectOverview
                    isDarkMode={isDarkMode}
                    mainProject={mainProject}
                    members={members}
                    progress={mainProjectProgress}
                    getInitials={getInitials}
                />

                {/* Toolbar */}
                <TasksToolbar
                    isDarkMode={isDarkMode}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    setIsAddingTask={setIsAddingTask}
                />

                {/* Kanban Board */}
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {boardColumns.map((column) => (
                        <BoardColumn
                            key={column.title}
                            title={column.title}
                            accent={column.accent}
                            tasks={tasksByColumn[column.title]}
                            isDarkMode={isDarkMode}
                            animatedTaskId={animatedTaskId}
                            getInitials={getInitials}
                            onEdit={handleOpenEditTask}
                            onDelete={handleDeleteTask}
                        />
                    ))}
                </div>
            </div>

            {/* Create Task Modal
            <AddTaskModal
                isOpen={isAddingTask}
                onClose={() => setIsAddingTask(false)}
            /> */}
        </div>
    );
};

export default Tasks;