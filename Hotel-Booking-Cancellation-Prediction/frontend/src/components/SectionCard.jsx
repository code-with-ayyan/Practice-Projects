import Icon from "./Icons";

/** One logical group of fields: a titled rail on the left, fields on the right. */
export default function SectionCard({ section, children }) {
  const headingId = `section-${section.id}`;
  return (
    <section className="section" aria-labelledby={headingId}>
      <div className="section__intro">
        <span className="section__icon" aria-hidden="true">
          <Icon name={section.icon} size={22} />
        </span>
        <h2 id={headingId} className="section__title">
          {section.title}
        </h2>
        <p className="section__text">{section.description}</p>
      </div>
      <div className="fields">{children}</div>
    </section>
  );
}
