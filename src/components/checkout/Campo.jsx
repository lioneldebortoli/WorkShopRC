import { useId } from "react";

export default function Campo({ label, error, adorno, ...props }) {
  const id = useId();
  const idError = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? idError : undefined}
          className={`h-12 w-full rounded-[14px] border-2 px-4 py-[14px] outline-none focus:border-(--rc-black) ${
            adorno ? "pr-20" : ""
          } ${error ? "border-(--rc-red)" : "border-(--rc-input-border)"}`}
          {...props}
        />
        {adorno && (
          <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">{adorno}</span>
        )}
      </div>
      {error && (
        <p id={idError} className="mt-1 text-sm font-semibold text-(--rc-red)">
          {error}
        </p>
      )}
    </div>
  );
}