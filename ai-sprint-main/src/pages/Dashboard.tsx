import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchProjects } from "../features/projects/projectsActions";
import ProjectCard from "../components/projects/ProjectCard";
import { SearchInput } from "../components/common/inputs/SearchInput";
import Spinner from "../components/common/Spinner";
import { openModal } from "../features/modal/modalSlice";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    projects = [],
    isFetching,
    fetchErrorMsg,
  } = useAppSelector((state) => state.projects);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const filteredProjects = (projects || []).filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalProjects = (projects || []).length;
  const activeProjects = (projects || []).filter(
    (p) => p.status === "active",
  ).length;
  const completedProjects = (projects || []).filter(
    (p) => p.status === "completed",
  ).length;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Projects</h1>
          <p className="text-gray-600">
            Manage your agile projects with AI-powered task generation
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Projects
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalProjects}
                </p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active</p>
                <p className="text-3xl font-bold text-gray-900">
                  {activeProjects}
                </p>
              </div>
              <div className="text-4xl text-green-500">●</div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Completed
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {completedProjects}
                </p>
              </div>
              <div className="text-4xl">✓</div>
            </div>
          </div>
        </div>

        {/* Search and Create Button */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex-1 max-w-xs">
            <SearchInput
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-6 py-2 bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all"
              onClick={() => dispatch(openModal({ name: "generateProject" }))}
            >
              + Create Project
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isFetching && (
          <div className="flex justify-center items-center py-12">
            <Spinner type={"loading"} />
          </div>
        )}

        {/* Error State */}
        {fetchErrorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{fetchErrorMsg}</p>
          </div>
        )}

        {/* Projects Grid */}
        {!isFetching && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isFetching && filteredProjects.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">✨</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No projects found
            </h2>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
