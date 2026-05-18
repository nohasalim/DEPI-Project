import React, { useEffect, useMemo, useState } from "react";
import api from "../services/api";

type TaskStatus = "Backlog" | "In Progress" | "Review" | "Done";

type Task = {
    id: number;
    title: string;
    details: string;
    status: TaskStatus;
    assignee: string;
};

type AccountUser = {
    id: string | number;
    username: string;
    email: string;
};

const boardColumns: Array<{ title: TaskStatus; accent: string }> = [
    { title: "Backlog", accent: "bg-slate-500" },
    { title: "In Progress", accent: "bg-sky-500" },
    { title: "Review", accent: "bg-purple-500" },
    { title: "Done", accent: "bg-emerald-500" },
];

const Tasks: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDetails, setTaskDetails] = useState("");
    const [taskAssignee, setTaskAssignee] = useState("");
    const [members, setMembers] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<"All" | TaskStatus>("All");
    const [mainProject, setMainProject] = useState({
        name: "Main Project",
        description: "This is the main project you are currently working on.",
    });
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDetails, setEditDetails] = useState("");
    const [editStatus, setEditStatus] = useState<TaskStatus>("Backlog");
    const [editAssignee, setEditAssignee] = useState("");
    const [animatedTaskId, setAnimatedTaskId] = useState<number | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchAuthenticatedUsers = async () => {
            try {
                const response = await api.get<AccountUser[]>("/users");
                if (!isMounted) return;

                const usernames = response.data
                    .map((user) => user.username?.trim())
                    .filter((username): username is string => Boolean(username));
                setMembers((previous) => {
                    const merged = [...usernames, ...previous];
                    return Array.from(new Set(merged));
                });
            } catch {
                // Keep existing members when users endpoint is unavailable.
            }
        };

        fetchAuthenticatedUsers();

        return () => {
            isMounted = false;
        };
    }, []);

    const visibleTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesSearch =
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.details.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = statusFilter === "All" || task.status === statusFilter;
            return matchesSearch && matchesFilter;
        });
    }, [searchTerm, statusFilter, tasks]);

    const tasksByColumn = useMemo(() => {
        return boardColumns.reduce<Record<TaskStatus, Task[]>>(
            (acc, column) => {
                acc[column.title] = visibleTasks.filter((task) => task.status === column.title);
                return acc;
            },
            { Backlog: [], "In Progress": [], Review: [], Done: [] },
        );
    }, [visibleTasks]);

    const mainProjectProgress = useMemo(() => {
        const total = tasks.length;
        const completed = tasks.filter((task) => task.status === "Done").length;
        const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
        return { total, completed, percentage };
    }, [tasks]);

    const handleCreateTask = (event: React.FormEvent) => {
        event.preventDefault();

        if (!taskTitle.trim()) return;

        const newTask: Task = {
            id: Date.now(),
            title: taskTitle.trim(),
            details: taskDetails.trim(),
            status: "Backlog",
            assignee: taskAssignee || members[0] || "Unassigned",
        };

        setTasks((previous) => [newTask, ...previous]);
        setTaskTitle("");
        setTaskDetails("");
        setTaskAssignee(members[0] || "");
        setIsAddingTask(false);
    };

    const handleInviteMember = () => {
        const nextMember = window.prompt("Enter teammate name");
        if (!nextMember || !nextMember.trim()) return;
        setMembers((previous) => [...previous, nextMember.trim()]);
    };

    const handleOpenEditTask = (task: Task) => {
        setEditingTask(task);
        setEditTitle(task.title);
        setEditDetails(task.details);
        setEditStatus(task.status);
        setEditAssignee(task.assignee);
    };

    const handleSaveEditTask = (event: React.FormEvent) => {
        event.preventDefault();
        if (!editingTask || !editTitle.trim()) return;

        setTasks((previous) =>
            previous.map((item) =>
                item.id === editingTask.id
                    ? {
                        ...item,
                        title: editTitle.trim(),
                        details: editDetails.trim(),
                        status: editStatus,
                        assignee: editAssignee || "Unassigned",
                    }
                    : item,
            ),
        );

        setAnimatedTaskId(editingTask.id);
        window.setTimeout(() => setAnimatedTaskId(null), 550);
        setEditingTask(null);
    };

    const handleDeleteTask = (taskId: number) => {
        setTasks((previous) => previous.filter((task) => task.id !== taskId));
    };

    const handleEditMainProject = () => {
        const updatedName = window.prompt("Main project name", mainProject.name);
        if (!updatedName || !updatedName.trim()) return;
        const updatedDescription =
            window.prompt("Main project description", mainProject.description) ?? mainProject.description;

        setMainProject({
            name: updatedName.trim(),
            description: updatedDescription.trim(),
        });
    };

    const getInitials = (name: string) => {
        const words = name.trim().split(/\s+/);
        if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
        return `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase();
    };

    return (
        <div
            className={`min-h-screen ${isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
                }`}
        >
            <div className="mx-auto max-w-310 px-6 py-6 lg:px-8">
                <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 via-purple-500 to-indigo-600 text-white shadow-sm">
                            <span className="text-lg">✨</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold">AI-Sprint</h1>
                            <p className={isDarkMode ? "text-sm text-slate-400" : "text-sm text-slate-500"}>
                                Project Management
                            </p>
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={() => setIsDarkMode((previous) => !previous)}
                            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isDarkMode
                                ? "border border-slate-700 bg-slate-900 text-black hover:bg-slate-800"
                                : "border border-slate-200 bg-white text-black hover:bg-slate-100"
                                }`}
                            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                aria-hidden="true"
                                fill="currentColor"
                            >
                                <path d="M12.25 2C7.14 2 3 6.14 3 11.25S7.14 20.5 12.25 20.5c3.96 0 7.34-2.49 8.68-5.99a.75.75 0 0 0-.92-.97 7.8 7.8 0 0 1-2.31.35c-4.32 0-7.83-3.51-7.83-7.83 0-1.05.21-2.06.58-2.99a.75.75 0 0 0-.7-1.07h-.5Z" />
                            </svg>
                        </button>
                    </div>
                </header>

                <button
                    className={`mb-5 text-sm font-medium transition-colors ${isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-700"
                        }`}
                >
                    ← Back to Dashboard
                </button>

                <section
                    className={`mb-6 rounded-2xl p-6 shadow-sm ${isDarkMode ? "border border-slate-800 bg-slate-900" : "border border-slate-200 bg-white"
                        }`}
                >
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-base" aria-hidden="true">
                                    📁
                                </span>
                                <p className={isDarkMode ? "text-sm font-semibold text-slate-200" : "text-sm font-semibold text-slate-700"}>
                                    {mainProject.name}
                                </p>
                            </div>
                            <p className={isDarkMode ? "mt-1 text-xs text-slate-400" : "mt-1 text-xs text-slate-500"}>
                                {mainProject.description}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="mr-2 text-right">
                                <p className={isDarkMode ? "text-sm font-semibold text-violet-300" : "text-sm font-semibold text-violet-600"}>
                                    {mainProjectProgress.percentage}%
                                </p>
                                <p className={isDarkMode ? "text-xs text-slate-400" : "text-xs text-slate-500"}>
                                    {mainProjectProgress.completed} of {mainProjectProgress.total} done
                                </p>
                            </div>
                            <div className="flex -space-x-2">
                                {members.map((member, index) => (
                                    <span
                                        key={`${member}-${index}`}
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-violet-500 text-[11px] font-semibold text-white"
                                        title={member}
                                    >
                                        {getInitials(member)}
                                    </span>
                                ))}
                            </div>
                            <button
                                onClick={handleInviteMember}
                                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${isDarkMode
                                    ? "border border-slate-700 text-slate-200 hover:bg-slate-800"
                                    : "border border-slate-200 text-slate-700 hover:bg-slate-100"
                                    }`}
                            >
                                Invite
                            </button>
                            <button
                                onClick={handleEditMainProject}
                                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${isDarkMode
                                    ? "border border-slate-700 text-slate-200 hover:bg-slate-800"
                                    : "border border-slate-200 text-slate-700 hover:bg-slate-100"
                                    }`}
                                title="Edit Main Project"
                            >
                                ⚙
                            </button>
                        </div>
                    </div>
                    <div className={`mt-4 h-2 w-full overflow-hidden rounded-full ${isDarkMode ? "bg-slate-700" : "bg-slate-200"}`}>
                        <div
                            className="h-full rounded-full bg-violet-600 transition-all duration-500"
                            style={{ width: `${mainProjectProgress.percentage}%` }}
                        />
                    </div>
                    <div
                        className={`mt-2 flex items-center justify-between text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"
                            }`}
                    >
                        <p>
                            {mainProjectProgress.completed} of {mainProjectProgress.total} completed
                        </p>
                        <p>{mainProjectProgress.total - mainProjectProgress.completed} remaining</p>
                    </div>
                </section>

                <section
                    className={`rounded-2xl p-5 shadow-sm ${isDarkMode ? "border border-slate-800 bg-slate-900" : "border border-slate-200 bg-white"
                        }`}
                >
                    {editingTask && (
                        <form
                            onSubmit={handleSaveEditTask}
                            className={`mb-5 grid gap-3 rounded-xl p-4 md:grid-cols-5 ${isDarkMode ? "border border-slate-700 bg-slate-950" : "border border-slate-200 bg-slate-50"
                                }`}
                        >
                            <input
                                value={editTitle}
                                onChange={(event) => setEditTitle(event.target.value)}
                                placeholder="Project name"
                                className={`rounded-lg px-3 py-2 text-sm outline-none ${isDarkMode
                                    ? "border border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500"
                                    : "border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                                    }`}
                                required
                            />
                            <input
                                value={editDetails}
                                onChange={(event) => setEditDetails(event.target.value)}
                                placeholder="Project description"
                                className={`rounded-lg px-3 py-2 text-sm outline-none ${isDarkMode
                                    ? "border border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500"
                                    : "border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                                    }`}
                            />
                            <select
                                value={editStatus}
                                onChange={(event) => setEditStatus(event.target.value as TaskStatus)}
                                className={`rounded-lg px-3 py-2 text-sm outline-none ${isDarkMode
                                    ? "border border-slate-700 bg-slate-900 text-slate-100"
                                    : "border border-slate-300 bg-white text-slate-900"
                                    }`}
                            >
                                {boardColumns.map((column) => (
                                    <option key={column.title} value={column.title}>
                                        {column.title}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={editAssignee}
                                onChange={(event) => setEditAssignee(event.target.value)}
                                className={`rounded-lg px-3 py-2 text-sm outline-none ${isDarkMode
                                    ? "border border-slate-700 bg-slate-900 text-slate-100"
                                    : "border border-slate-300 bg-white text-slate-900"
                                    }`}
                            >
                                <option value="">Unassigned</option>
                                {members.map((member) => (
                                    <option key={member} value={member}>
                                        {member}
                                    </option>
                                ))}
                            </select>
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingTask(null)}
                                    className={`rounded-lg px-4 py-2 text-sm font-semibold ${isDarkMode
                                        ? "border border-slate-700 text-slate-200 hover:bg-slate-800"
                                        : "border border-slate-300 text-slate-700 hover:bg-slate-100"
                                        }`}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <select
                                value={statusFilter}
                                onChange={(event) => setStatusFilter(event.target.value as "All" | TaskStatus)}
                                className={`rounded-lg px-3 py-2 text-sm outline-none ${isDarkMode
                                    ? "border border-slate-700 bg-slate-900 text-slate-200"
                                    : "border border-slate-200 bg-white text-slate-700"
                                    }`}
                            >
                                <option value="All">All</option>
                                {boardColumns.map((column) => (
                                    <option key={column.title} value={column.title}>
                                        {column.title}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search tasks..."
                                aria-label="Search tasks"
                                className={`rounded-lg px-3 py-2 text-sm outline-none ${isDarkMode
                                    ? "border border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500"
                                    : "border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
                                    }`}
                            />
                        </div>

                        <button
                            onClick={() => setIsAddingTask((previous) => !previous)}
                            className="rounded-xl bg-linear-to-r from-violet-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                        >
                            + New Task
                        </button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {boardColumns.map((column) => (
                            <div
                                key={column.title}
                                className={`rounded-xl p-3 ${isDarkMode ? "bg-slate-950" : "bg-slate-50"}`}
                            >
                                <div className={`mb-3 border-b pb-2 ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}>
                                    <div className="mb-2 flex items-center gap-2">
                                        <span className={`h-2 w-2 rounded-full ${column.accent}`} />
                                        <h3 className={isDarkMode ? "text-sm font-semibold text-slate-200" : "text-sm font-semibold text-slate-800"}>
                                            {column.title}
                                        </h3>
                                        <span className={isDarkMode ? "text-xs text-slate-400" : "text-xs text-slate-500"}>
                                            {tasksByColumn[column.title].length}
                                        </span>
                                    </div>
                                    <div className={`h-1 w-full rounded-full ${column.accent}`} />
                                </div>

                                {tasksByColumn[column.title].length === 0 ? (
                                    <div
                                        className={`flex h-52 items-center justify-center rounded-lg border border-dashed ${isDarkMode ? "border-slate-700 bg-slate-900" : "border-slate-300 bg-white"
                                            }`}
                                    >
                                        <p className={isDarkMode ? "text-sm text-slate-500" : "text-sm text-slate-400"}>No tasks yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {tasksByColumn[column.title].map((task) => (
                                            <article
                                                key={task.id}
                                                className={`rounded-lg border p-3 ${isDarkMode ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"
                                                    } transition-all duration-500 ${animatedTaskId === task.id ? "scale-105 ring-2 ring-violet-400 shadow-lg" : ""
                                                    }`}
                                            >
                                                <h4 className={isDarkMode ? "text-sm font-semibold text-slate-100" : "text-sm font-semibold text-slate-800"}>
                                                    {task.title}
                                                </h4>
                                                <p className={isDarkMode ? "mt-2 text-xs text-slate-400" : "mt-2 text-xs text-slate-500"}>
                                                    {task.details || "No description"}
                                                </p>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-500 text-[10px] font-semibold text-white">
                                                        {getInitials(task.assignee)}
                                                    </span>
                                                    <p className={isDarkMode ? "text-xs text-slate-300" : "text-xs text-slate-600"}>
                                                        {task.assignee}
                                                    </p>
                                                </div>
                                                <div className="mt-3 flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleOpenEditTask(task)}
                                                        className={`rounded px-2 py-1 text-xs font-medium ${isDarkMode
                                                            ? "border border-slate-700 text-slate-200 hover:bg-slate-800"
                                                            : "border border-slate-300 text-slate-700 hover:bg-slate-100"
                                                            }`}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteTask(task.id)}
                                                        className="rounded border border-rose-300 px-2 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            {isAddingTask && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/55 px-4">
                    <form
                        onSubmit={handleCreateTask}
                        className="w-full max-w-190 overflow-hidden rounded-xl border border-violet-200 bg-white shadow-2xl"
                    >
                        <div className="flex items-start justify-between bg-linear-to-r from-violet-600 to-indigo-600 px-6 py-5 text-white">
                            <div>
                                <h3 className="text-3xl font-bold">✧ Create New Project</h3>
                                <p className="mt-2 text-sm text-violet-100">
                                    Let AI help you generate tasks based on your project goal
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsAddingTask(false)}
                                className="text-lg text-violet-100 transition-colors hover:text-white"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4 px-6 py-6">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Project Name</label>
                                <input
                                    value={taskTitle}
                                    onChange={(event) => setTaskTitle(event.target.value)}
                                    placeholder="e.g., E-Commerce Platform"
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-violet-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Project Goal</label>
                                <textarea
                                    value={taskDetails}
                                    onChange={(event) => setTaskDetails(event.target.value)}
                                    placeholder="Describe what you want to achieve with this project..."
                                    rows={3}
                                    className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-violet-400"
                                />
                                <p className="mt-2 text-xs text-slate-400">
                                    Be specific about your goals for better AI task generation
                                </p>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Assigned To</label>
                                <select
                                    value={taskAssignee}
                                    onChange={(event) => setTaskAssignee(event.target.value)}
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-violet-400"
                                >
                                    <option value="">Unassigned</option>
                                    {members.map((member) => (
                                        <option key={member} value={member}>
                                            {member}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4">
                            <button
                                type="button"
                                onClick={() => setIsAddingTask(false)}
                                className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-lg bg-linear-to-r from-violet-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90"
                            >
                                ✨ Generate AI Tasks
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Tasks;