import type { WorkItem } from '@/lib/portfolio';

type Props = {
  items: WorkItem[];
};

function getLogoPath(item: WorkItem) {
  const slug = item.id.split('/').pop()?.replace(/\.md$/, '');
  return slug ? `/images/${slug}.svg` : undefined;
}

export default function WorkCards({ items }: Props) {
  return (
    <div className="work-grid">
      {items.map((item) => {
        const logoPath = getLogoPath(item);

        return (
          <article key={item.id} className="work-card">
            <div className="work-card__media" aria-hidden="true">
              {logoPath ? (
                <img src={logoPath} alt="" className="work-card__logo" loading="lazy" />
              ) : (
                <span className="work-card__fallback">{item.data.company.slice(0, 2).toUpperCase()}</span>
              )}
            </div>

            <div className="work-card__body">
              <p className="work-card__period">{item.data.period}</p>
              <h3 className="work-card__company">{item.data.company}</h3>
              <p className="work-card__role">{item.data.role}</p>
              <p className="work-card__summary">{item.data.summary}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
