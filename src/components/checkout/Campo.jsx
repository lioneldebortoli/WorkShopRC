import { useId } from "react";

export default function Campo({ label, error, ...props }) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? "true" : undefined}
        className={`h-12 w-full rounded-[14px] border-2 px-4 py-\[14px\] outline-none focus:border-(--rc-black) ${
          error ? "border-(--rc-red)" : "border-(--rc-input-border)"
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm font-semibold text-(--rc-red)">{error}</p>}
    </div>
  );
}