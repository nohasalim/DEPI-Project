
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import api from "../services/api";

import BoardColumn from "../components/tasks/BoardColumn";
import TasksToolbar from "../components/tasks/TasksToolbar";
import ProjectOverview from "../components/tasks/ProjectOverview";

import type { TaskStatus } from "../types/task.types";
import { setTasks } from "../features/tasks/tasksSlice";
import type { Project } from "../types/project.types";
const boardColumns: Array<{ title: TaskStatus; accent: string }> = [
    { title: "Backlog", accent: "bg-slate-500" },
    { title: "In Progress", accent: "bg-sky-500" },
    { title: "Review", accent: "bg-purple-500" },
    { title: "Completed", accent: "bg-emerald-500" },
];



const Tasks: React.FC = () => {
    const navigate = useNavigate();

    const { projectId } = useParams();

    const dispatch = useAppDispatch();

    const { tasks } = useAppSelector((state) => state.task);


    const [searchTerm, setSearchTerm] = useState("");

    const [statusFilter, setStatusFilter] = useState<"All" | TaskStatus>("All");


    const [mainProject, setMainProject] =
        useState<Project | null>(null);

    // =========================
    // Fetch Project + Tasks
    // =========================
    useEffect(() => {
        const fetchProjectTasks = async () => {
            try {
                const response = await api.get(
                    `api/v1/projectdetails/${projectId}`,
                );

                dispatch(setTasks(response.data.data.tasks));

                setMainProject(response.data.data.project);

            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
        };

        if (projectId) {
            fetchProjectTasks();
        }
    }, [projectId, dispatch]);

    console.log("mainProject", mainProject)
    console.log("tasks", tasks)
    // =========================
    // Filter Tasks
    // =========================
    const visibleTasks = useMemo(() => {
        return tasks?.filter((task) => {
            const matchesSearch =
                task.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                task.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesFilter =
                statusFilter === "All" ||
                task.status === statusFilter;

            return matchesSearch && matchesFilter;
        });
    }, [tasks, searchTerm, statusFilter]);

    // // =========================
    // // Tasks By Column
    // // =========================
    // const tasksByColumn = useMemo(() => {
    //     return boardColumns.reduce<Record<TaskStatus, TaskDetails[]>>(
    //         (acc, column) => {
    //             acc[column.title] = visibleTasks?.filter(
    //                 (task) => task.status === column.title,
    //             );

    //             return acc;
    //         },
    //         {
    //             Backlog: [],
    //             "In Progress": [],
    //             Review: [],
    //             Completed: [],
    //         },
    //     );
    // }, [visibleTasks]);

    // =========================
    // Project Progress
    // =========================
    const mainProjectProgress = useMemo(() => {
        const total = tasks?.length || 0;

        const completed = tasks?.filter(
            (task) => task.status === "Completed",
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



    // =========================
    // Get Initials
    // =========================
    const getInitials = (name: string) => {
        const words = name?.trim().split(/\s+/);

        if (words?.length === 1) {
            return words[0].slice(0, 2).toUpperCase();
        }

        return `${words[0]?.[0] || ""}${words[1]?.[0] || ""}`?.toUpperCase();
    };

    return (
        <div

        >
            <div className="mx-auto max-w-310 px-6 py-6 lg:px-8">
                {/* Back Button */}

                <button
                    onClick={() => navigate("/dashboard")}
                    className={`mb-5 text-sm font-medium transition-colors text-slate-500 hover:text-slate-700`}
                >
                    ← Back to Dashboard
                </button>



                {/* Project Overview */}
                {mainProject && (
                    <ProjectOverview
                        mainProject={mainProject}
                        progress={mainProjectProgress}
                        getInitials={getInitials}
                    />
                )}

                {/* Toolbar */}
                {mainProject && (
                    <TasksToolbar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        projectId={mainProject._id}
                        projectName={mainProject.name}
                    />
                )}
                {/* Kanban Board */}
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {mainProject && (
                        <>
                            {boardColumns?.map((column) => {
                                const columnTasks = tasks?.filter(
                                    (task) => task.status === column.title
                                );
                                return (
                                    <BoardColumn
                                        key={column.title}
                                        title={column.title}
                                        accent={column.accent}
                                        tasks={columnTasks}
                                        mainProjectId={mainProject._id}
                                    />
                                );
                            })}
                        </>
                    )}

                </div>
            </div>

        </div>
    );
};

export default Tasks;