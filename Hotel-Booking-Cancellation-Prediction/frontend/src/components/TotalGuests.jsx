import Icon from "./Icons";

/** Live, read-only summary. Not an input and never sent to the API. */
export default function TotalGuests({ total }) {
  return (
    <div className="total-guests" role="group" aria-label="Total guests">
      <span className="total-guests__icon" aria-hidden="true">
        <Icon name="users" size={20} />
      </span>
      <div className="total-guests__text">
        <span className="total-guests__label">Total Guests</span>
        <span className="total-guests__hint">
          Adults, children and babies combined. Calculated automatically.
        </span>
      </div>
      <output className="total-guests__value" aria-live="polite">
        {total}
      </output>
    </div>
  );
}
