type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 text-center">
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-600 md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}