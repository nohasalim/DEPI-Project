// import React from "react";
// import type { Project, ProjectStatus } from "../../types/project.types";
// import { useAppDispatch } from "../../hooks/useAppDispatch";
// import { openModal } from "../../features/modal/modalSlice";
// import { MdOutlineDateRange } from "react-icons/md";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { FaRegEdit } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// interface ProjectCardProps {
//   project: Project;
// }

// const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const statusColors: Record<
//     ProjectStatus,
//     { badge: string; progress: string }
//   > = {
//     active: {
//       badge: "bg-green-100 text-green-700",
//       progress: "bg-linear-to-r from-green-400 to-green-500",
//     },
//     completed: {
//       badge: "bg-blue-100 text-blue-700",
//       progress: "bg-linear-to-r from-blue-400 to-blue-500",
//     },
//     archived: {
//       badge: "bg-orange-100 text-orange-700",
//       progress: "bg-linear-to-r from-orange-400 to-orange-500",
//     },
//   };
//   console.log(project)
//   // console.log(project.status);
//   const colors = statusColors[project.status];
//   // console.log("colors", colors)

//   return (
//     <div
//       onClick={() => navigate(`/tasks/${project._id}`)}

//       className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
//       {/* Icon and Status */}
//       <div className="flex items-start justify-between mb-4">
//         <div
//           className={`w-12 h-12 rounded-lg ${project.iconBgColor} flex items-center justify-center text-xl`}
//         >
//           {project.icon}
//         </div>
//         <span
//           className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.badge}`}
//         >
//           {project.status}
//         </span>
//       </div>

//       {/* Title and Description */}
//       <h3 className="text-lg font-semibold text-gray-900 mb-2">
//         {project.name}
//       </h3>
//       <p className="text-sm text-gray-600 mb-4 line-clamp-2">
//         {project.description}
//       </p>

//       {/* Progress Section */}
//       <div className="mb-4">
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-xs font-medium text-gray-600">PROGRESS</span>
//           <span className="text-sm font-semibold text-gray-900">
//             {project.progress}%
//           </span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2">
//           <div
//             className={`${colors.progress} h-2 rounded-full transition-all`}
//             style={{ width: `${project.progress}%` }}
//           />
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//         <div className="flex items-center justify-between text-xs text-gray-600">
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-1">
//               <span>👥</span>
//               <span>{project?.teamMembers?.length}</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <MdOutlineDateRange />
//               <span>{project.createdAt}</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <button
//                 className="cursor-pointer"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   dispatch(
//                     openModal({
//                       name: "deleteProject",
//                       data: { _id: project._id, name: project.name },
//                     }),
//                   )
//                 }
//                 }>
//                 <RiDeleteBin6Line />
//               </button>
//               <button
//                 className="cursor-pointer"
//                 onClick={(e) => {
//                   e.stopPropagation();

//                   dispatch(
//                     openModal({
//                       name: "editProject",
//                       data: {
//                         _id: project._id,
//                         name: project.name,
//                         description: project.description,
//                       },
//                     }),
//                   )
//                 }}>
//                 <FaRegEdit />
//               </button>
//             </div>
//           </div>
//         </div>
//         {/* <span className="text-xs text-gray-500">{project.date}</span> */}
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;
import React from "react";
import type { Project, ProjectStatus } from "../../types/project.types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { openModal } from "../../features/modal/modalSlice";
import { MdOutlineDateRange } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
}

/** Format a date like "Apr 02" */
const formatDate = (raw: string | Date | undefined): string => {
  if (!raw) return "—";
  const d = new Date(raw);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isProgressEditing, setIsProgressEditing] = useState(false);
  const [tempProgress, setTempProgress] = useState(project.progress);

  const statusColors: Record<
    ProjectStatus,
    { badge: string; progress: string; progressText: string }
  > = {
    active: {
      badge: "bg-green-100 text-green-700",
      progress: "bg-gradient-to-r from-red-400 to-orange-400",
      progressText: "text-red-500",
    },
    completed: {
      badge: "bg-blue-100 text-blue-700",
      progress: "bg-gradient-to-r from-blue-400 to-blue-500",
      progressText: "text-blue-500",
    },
    archived: {
      badge: "bg-orange-100 text-orange-700",
      progress: "bg-gradient-to-r from-orange-400 to-orange-500",
      progressText: "text-orange-500",
    },
  };

  const colors = statusColors[project.status];

  const handleProgressSave = () => {
    setIsProgressEditing(false);
    // Dispatch update project action with tempProgress
  };

  return (
    <div
      onClick={() => navigate(`/tasks/${project._id}`)}
      className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Icon and Status */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl ${project.iconBgColor} flex items-center justify-center text-xl`}
        >
          {project.icon}
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide ${colors.badge}`}
        >
          {project.status}
        </span>
      </div>

      {/* Title and Description */}
      <h3 className="text-lg font-bold text-gray-900 mb-1">{project.name}</h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* Progress Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Progress
          </span>
          {isProgressEditing ? (
            <input
              type="number"
              min="0"
              max="100"
              value={tempProgress}
              onChange={(e) =>
                setTempProgress(
                  Math.min(100, Math.max(0, parseInt(e.target.value) || 0)),
                )
              }
              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
              autoFocus
            />
          ) : (
            <span
              className={`text-sm font-bold cursor-pointer ${colors.progressText}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsProgressEditing(true);
              }}
            >
              {project.progress}%
            </span>
          )}
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className={`${colors.progress} h-2 rounded-full transition-all`}
            style={{ width: `${project.progress}%` }}
          />
        </div>

        {isProgressEditing && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleProgressSave();
              }}
              className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsProgressEditing(false);
                setTempProgress(project.progress);
              }}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        {/* Left: team members + date */}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <span className="text-sm">👥</span>
            <span>{project?.team?.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <MdOutlineDateRange className="text-sm" />
            <span className="font-medium text-gray-500">
              {formatDate(project.createdAt)}
            </span>
          </div>
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-3 text-gray-400">
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(
                openModal({
                  name: "deleteProject",
                  data: { _id: project._id, name: project.name },
                }),
              );
            }}
            className="hover:text-red-500 transition-colors"
          >
            <RiDeleteBin6Line />
          </button>
          <button
            onClick={(e) => {
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
              );
            }}
            className="hover:text-blue-500 transition-colors"
          >
            <FaRegEdit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
