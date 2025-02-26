import clsx from "clsx";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  className?: string;
  loadingText?: string;
  defaultText?: string;
  children?: React.ReactNode;
};

export function SubmitButton({
  children,
  loadingText = "Submitting...",
  defaultText = "Submit",
  className = "",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx("flex gap-1 items-center justify-center", className)}
    >
      {children}
      {pending ? loadingText : defaultText}
    </button>
  );
}
