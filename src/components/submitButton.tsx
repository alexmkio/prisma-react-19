import { useFormStatus } from "react-dom";

export function SubmitButton({ className }: { className?: string }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}
