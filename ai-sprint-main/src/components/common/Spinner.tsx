interface SpinnerProps {
  type: "loading" | null;
}

export default function Spinner({ type }: SpinnerProps) {
  return (
    <div
      className={`flex justify-center items-center ${type === "loading" ? "w-16 h-16 rounded-full bg-linear-to-r from-gray-100 to-gray-200" : ""}`}
    >
      <div
        className={`animate-spin rounded-full  border-primary-start border-t-transparent ${type === "loading" ? "h-8 w-8 border-4" : "h-3 w-3 border-2"}`}
      ></div>
    </div>
  );
}
