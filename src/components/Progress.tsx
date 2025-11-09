import { CircularProgress } from "@chakra-ui/react";

interface ProgressProps {
  loading?: boolean; // Controls whether the loading overlay is visible
}

const Progress = ({ loading = false }: ProgressProps) => {
  // Don't render anything if not loading
  if (!loading) {
    return null;
  }

  return (
    // Full-screen overlay with backdrop blur effect
    <div
      className={`flex w-[100vw] h-[100vh] justify-center items-center modal-backdrop${loading ? " show" : ""}`}
    >
      {/* Chakra UI circular progress spinner with app's primary color */}
      <CircularProgress isIndeterminate color={"#151936"} />
    </div>
  );
};

export default Progress;
