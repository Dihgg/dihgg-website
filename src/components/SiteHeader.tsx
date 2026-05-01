import Pill from "@/components/Pill";
import Logo from "@/components/Logo";

type CTA = {
  href: string;
  label: string;
}
export type HeaderProps = {
  brandHref: string;
  blog: CTA;
  contact: CTA;
  projects: CTA;
};

export default function SiteHeader(props: HeaderProps) {
  const { brandHref, blog, contact, projects } = props;
  return (
    <header className="sticky top-0 z-50 border-b border-blue-100/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <a href={brandHref} className="inline-flex items-center gap-2 text-slate-900 transition hover:text-blue-700">
          <Logo />
        </a>

        <nav className="flex items-center gap-2" aria-label="Main navigation">
          <Pill
            href={blog.href}
          >
            {blog.label}
          </Pill>
          <Pill
            variant="default"
            href={projects.href}
            className="hidden sm:flex"
          >
            {projects.label}
          </Pill>
          <Pill
            variant="primary"
            href={contact.href}
          >
            {contact.label}
          </Pill>
        </nav>
      </div>
    </header>
  );
}
