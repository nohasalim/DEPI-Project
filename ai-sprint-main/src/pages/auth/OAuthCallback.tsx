import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchCurrentUser } from "../../features/auth/authActions";
import { toast } from "react-toastify";

const OAuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      toast.error("Authentication failed. No token received.");
      navigate("/login", { replace: true });
      return;
    }

    const authenticate = async () => {
      const result = await dispatch(fetchCurrentUser(token));

      if (fetchCurrentUser.fulfilled.match(result)) {
        toast.success("Welcome! Redirecting to dashboard...");
        navigate("/dashboard", { replace: true });
      } else {
        toast.error("Authentication failed. Please try again.");
        navigate("/login", { replace: true });
      }
    };

    authenticate();
  }, [searchParams, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 relative">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Signing you in...
        </h2>
        <p className="text-gray-500">
          Please wait while we complete your authentication.
        </p>
      </div>
    </div>
  );
};

export default OAuthCallback;
