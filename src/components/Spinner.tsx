import { CgSpinner } from "react-icons/cg";

interface SpinnerProps {
  message?: string;
  addElipsis?: boolean;
}

const Spinner = ({ message = "", addElipsis = true }: SpinnerProps) => {
  return (
    <p className="flex items-center gap-x-2 justify-center">
      {message}
      {addElipsis ? "..." : ""}
      <CgSpinner className="animate-spin" size={25} />
    </p>
  );
};

export default Spinner;
