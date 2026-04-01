import type { WorkItem } from "@/types";
import { translations } from "@/data/translations";

type Props = {
  items: WorkItem[];
};

export default function WorkCards({ items }: Props) {
  return (
    <div className="work-grid">
      {items.map((item) => {
        
        const { company, logo, role, summary, yearIn, yearOut } = item.data;
        const outYearDisplay = yearOut ?? translations[item.data.locale].today;

        return (
          <article key={item.id} className="work-card">
            <div className="work-card__media" aria-hidden="true">
              <img src={`/images/${logo}`} alt="" className="work-card__logo" loading="lazy" />
            </div>
            <div className="work-card__body">
              <p className="work-card__period">
                <span>{yearIn}</span>
                {(yearOut !== yearIn) && <span> - {outYearDisplay}</span>}
              </p>
              <h3 className="work-card__company">{company}</h3>
              <p className="work-card__role">{role}</p>
              <p className="work-card__summary">{summary}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
