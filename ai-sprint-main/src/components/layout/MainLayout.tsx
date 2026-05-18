import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import Navbar from "./Navbar";

const MainLayout: React.FC = () => {
  const { user, token } = useAppSelector((state) => state.auth);

  // If not authenticated, redirect to login
  if (!token && !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
