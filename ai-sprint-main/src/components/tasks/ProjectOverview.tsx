// src/components/tasks/ProjectOverview.tsx

import React from "react";

interface MainProject {
    name: string;
    description: string;
}

interface Progress {
    total: number;
    completed: number;
    percentage: number;
}

interface ProjectOverviewProps {
    mainProject: MainProject;
    members: string[];
    progress: Progress;
    getInitials: (name: string) => string;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({
    mainProject,
    members,
    progress,
    getInitials,
}) => {
    const handleInviteMember = () => {
        window.prompt("Enter teammate name");
    };

    const handleEditMainProject = () => {
        window.prompt("Edit project");
    };

    return (
        <section
            className={`mb-6 rounded-2xl p-6 shadow-sm 
                   border border-slate-200 bg-white`}
        >
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">

                {/* Project Info */}
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-base" aria-hidden="true">
                            📁
                        </span>

                        <p
                            className={

                                "text-sm font-semibold text-slate-700"
                            }
                        >
                            {mainProject.name}
                        </p>
                    </div>

                    <p
                        className={

                            "mt-1 text-xs text-slate-500"
                        }
                    >
                        {mainProject.description}
                    </p>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2">

                    {/* Progress */}
                    <div className="mr-2 text-right">
                        <p
                            className={

                                "text-sm font-semibold text-violet-600"
                            }
                        >
                            {progress.percentage}%
                        </p>

                        <p
                            className={

                                "text-xs text-slate-500"
                            }
                        >
                            {progress.completed} of {progress.total} done
                        </p>
                    </div>

                    {/* Members */}
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

                    {/* Invite Button */}
                    <button
                        onClick={handleInviteMember}
                        className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors
                           border border-slate-200 text-slate-700 hover:bg-slate-100`}
                    >
                        Invite
                    </button>

                    {/* Settings Button */}
                    <button
                        onClick={handleEditMainProject}
                        className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors 
                            border border-slate-200 text-slate-700 hover:bg-slate-100`}
                        title="Edit Main Project"
                    >
                        ⚙
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div
                className={`mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200`}
            >
                <div
                    className="h-full rounded-full bg-violet-600 transition-all duration-500"
                    style={{ width: `${progress.percentage}%` }}
                />
            </div>

            {/* Footer */}
            <div
                className={`mt-2 flex items-center justify-between text-xs 
                    text-slate-500`}
            >
                <p>
                    {progress.completed} of {progress.total} completed
                </p>

                <p>
                    {progress.total - progress.completed} remaining
                </p>
            </div>
        </section>
    );
};

export default ProjectOverview;