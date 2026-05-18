import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import OAuthCallback from "./pages/auth/OAuthCallback";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/layout/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./components/modal/Modal";
import CanbanBoard from "./pages/CanbanBoard";

function App() {
  return (
    <>
      <Routes>
        {/* Public auth routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<OAuthCallback />} />

        {/* Protected routes wrapped in MainLayout (Navbar + auth guard) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projectDetails/:id" element={<CanbanBoard />} />
        </Route>

        {/* Catch-all: redirect to dashboard (MainLayout will bounce to /login if unauthenticated) */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Modal />
      <ToastContainer />
    </>
  );
}

export default App;
