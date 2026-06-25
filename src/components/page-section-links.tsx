import { pageSections } from "@/lib/site";

export function PageSectionLinks() {
  return (
    <nav
      aria-label="Быстрые ссылки по разделам страницы"
      className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:left-4 focus-within:top-4 focus-within:z-50 focus-within:rounded-xl focus-within:bg-white focus-within:p-4 focus-within:text-ink focus-within:shadow-card"
    >
      <p className="mb-3 text-sm font-semibold">Разделы страницы</p>
      <ul className="grid gap-2 text-sm">
        {pageSections.map((section) => (
          <li key={section.id}>
            <a
              className="underline decoration-black/25 underline-offset-4 transition hover:decoration-black focus:outline-none focus-visible:decoration-black"
              href={section.href}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
