import Pill from "@/components/Pill";

export type HeaderProps = {
  brandHref: string;
  blogHref: string;
  blogLabel: string;
  contactHref: string;
  contactLabel: string;
  projectsHref?: string;
  projectsLabel?: string;
};

export default function SiteHeader({ brandHref, blogHref, contactHref, blogLabel, contactLabel, projectsHref, projectsLabel }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-blue-100/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <a href={brandHref} className="inline-flex items-center gap-2 text-slate-900 transition hover:text-blue-700">
          <img src="/images/avatar.png" alt="Dihgg icon" className="h-6 w-6 rounded-sm object-cover" />
          <span className="font-mono text-xs uppercase tracking-[0.2em]">{'{Dihgg}'}</span>
        </a>

        <nav className="flex items-center gap-2" aria-label="Main navigation">
          <Pill
            href={blogHref}
          >{blogLabel}</Pill>
          <Pill
            variant="default"
            href={projectsHref}
            className="hidden sm:flex"
          >{projectsLabel}</Pill>
          <Pill
            variant="primary"
            href={contactHref}
          >{contactLabel}</Pill>
        </nav>
      </div>
    </header>
  );
}
