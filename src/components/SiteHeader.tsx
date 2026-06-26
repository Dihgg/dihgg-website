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
    <header className="header">
      <div className="header__content">
        <a href={brandHref} className="header__content__logo">
          <Logo />
        </a>
        <nav className="header__content__nav" aria-label="Main navigation">
          <Pill
            href={blog.href}
            data-ga="blog-header"
          >
            {blog.label}
          </Pill>
          <Pill
            variant="default"
            href={projects.href}
            className="hidden sm:flex"
            data-ga="projects-header"
          >
            {projects.label}
          </Pill>
          <Pill
            variant="primary"
            href={contact.href}
            data-ga="contact-header"
          >
            {contact.label}
          </Pill>
        </nav>
      </div>
    </header>
  );
}
