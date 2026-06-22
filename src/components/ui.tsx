import { ArrowRight, ChevronRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  icon?: "arrow" | "chevron";
  underlineOnHover?: boolean;
  variant?: "dark" | "light";
};

export function ButtonLink({
  children,
  className = "",
  icon = "arrow",
  underlineOnHover = false,
  variant = "dark",
  ...props
}: ButtonLinkProps) {
  const variants = {
    dark: "bg-ink text-white hover:bg-black",
    light: "bg-white text-ink hover:bg-slate-100",
  };

  return (
    <a
      className={`group inline-flex h-[76px] items-center justify-center gap-4 rounded-full px-10 text-[25px] font-extrabold transition duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      <span className={underlineOnHover ? "group-hover:underline group-hover:underline-offset-4" : undefined}>
        {children}
      </span>
      {icon === "chevron" ? (
        <ChevronRight aria-hidden="true" className="h-5 w-5 shrink-0 stroke-[2.6]" />
      ) : (
        <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 stroke-[2.6]" />
      )}
    </a>
  );
}

export function SectionIntro({
  eyebrow,
  headingId,
  title,
  className = "",
  titleClassName = "",
}: {
  eyebrow: string;
  headingId?: string;
  title: string;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={className}>
      <p className="mb-3 text-[20px] font-semibold leading-none text-[#91979e] max-sm:mb-2 max-sm:text-[17px]">
        {eyebrow}
      </p>
      <h2
        className={`max-w-[1120px] text-[35px] font-semibold leading-[1.08] tracking-normal text-black max-sm:leading-[1.12] ${titleClassName}`}
        id={headingId}
      >
        {title}
      </h2>
    </div>
  );
}
