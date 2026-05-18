import React from "react";
import type { Project, ProjectStatus } from "../../types/project.types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { openModal } from "../../features/modal/modalSlice";
import { MdOutlineDateRange } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const statusColors: Record<
    ProjectStatus,
    { badge: string; progress: string }
  > = {
    active: {
      badge: "bg-green-100 text-green-700",
      progress: "bg-linear-to-r from-green-400 to-green-500",
    },
    completed: {
      badge: "bg-blue-100 text-blue-700",
      progress: "bg-linear-to-r from-blue-400 to-blue-500",
    },
    archived: {
      badge: "bg-orange-100 text-orange-700",
      progress: "bg-linear-to-r from-orange-400 to-orange-500",
    },
  };
  console.log(project)
  // console.log(project.status);
  const colors = statusColors[project.status];
  // console.log("colors", colors)

  return (
    <div
      onClick={() => navigate(`/projectDetails/${project._id}`)}

      className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Icon and Status */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-lg ${project.iconBgColor} flex items-center justify-center text-xl`}
        >
          {project.icon}
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.badge}`}
        >
          {project.status}
        </span>
      </div>

      {/* Title and Description */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {project.name}
      </h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* Progress Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600">PROGRESS</span>
          <span className="text-sm font-semibold text-gray-900">
            {project.progress}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`${colors.progress} h-2 rounded-full transition-all`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span>👥</span>
              <span>{project.teamMembers}</span>
            </div>
            <div className="flex items-center gap-1">
              <MdOutlineDateRange />
              <span>{project.date}</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    openModal({
                      name: "deleteProject",
                      data: { _id: project._id, name: project.name },
                    }),
                  )
                }
                }>
                <RiDeleteBin6Line />
              </button>
              <button onClick={(e) => {
                e.stopPropagation();

                dispatch(
                  openModal({
                    name: "editProject",
                    data: {
                      _id: project._id,
                      name: project.name,
                      description: project.description,
                    },
                  }),
                )
              }}>
                <FaRegEdit />
              </button>
            </div>
          </div>
        </div>
        {/* <span className="text-xs text-gray-500">{project.date}</span> */}
      </div>
    </div>
  );
};

export default ProjectCard;
