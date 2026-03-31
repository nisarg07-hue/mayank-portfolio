import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      <div className="text-xs tracking-[0.26em] uppercase text-zinc-500">
        {eyebrow}
      </div>
      <h2 className="mt-3 text-2xl sm:text-3xl tracking-tight text-zinc-100">
        {title}
      </h2>
      {children ? (
        <div className="mt-4 text-sm leading-7 text-zinc-400">{children}</div>
      ) : null}
    </div>
  );
}

