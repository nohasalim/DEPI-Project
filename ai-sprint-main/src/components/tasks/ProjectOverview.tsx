
import React, { useEffect, useState } from "react";
import { openModal } from "../../features/modal/modalSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getTeamMembers } from "../../services/invitationService";

interface MainProject {
    _id: string;
    name: string;
    description: string;
    team: any[];
}

interface Progress {
    total: number;
    completed: number;
    percentage: number;
}

interface ProjectOverviewProps {
    mainProject: MainProject;
    progress: Progress;
    getInitials: (name: string) => string;
}
interface TeamMember {
    _id: string;
    name?: string;
    username?: string;
    email: string;
    avatar?: string;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({
    mainProject,
    progress,
    getInitials,
}) => {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await getTeamMembers(mainProject._id);

                setMembers(response.data.members || []);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMembers();
    }, [mainProject._id]);

    console.log("ProjectOverview - Members:", members);


    const handleInviteMember = () => {
        dispatch(
            openModal({
                name: "inviteTeamMember",
                data: {
                    projectName: mainProject.name,
                    projectId: mainProject._id,
                },
            })
        );
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
                                title={member.name || member.email}
                            >
                                {getInitials(member.name || member.email)}
                            </span>
                        ))}
                    </div>

                    {/* Invite Button */}
                    <button
                        onClick={handleInviteMember}
                        className="rounded-xl bg-linear-to-r from-violet-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 cursor-pointer"

                    >

                        Invite
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
        </section >
    );
};

export default ProjectOverview;