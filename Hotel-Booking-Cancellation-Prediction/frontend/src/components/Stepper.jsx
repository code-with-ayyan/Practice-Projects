import Icon from "./Icons";
import { parseNumber } from "../services/validation";

/**
 * Number input with − / + buttons for small whole-number counts.
 * The value is kept as a string so the user can still type freely.
 */
export default function Stepper({
  id,
  label,
  value,
  onChange,
  onBlur,
  invalid,
  describedBy,
  min = 0,
}) {
  const parsed = parseNumber(value);
  const current = Number.isFinite(parsed) ? Math.floor(parsed) : 0;

  return (
    <div className="control-shell stepper">
      <button
        type="button"
        className="stepper__button"
        aria-label={`Decrease ${label}`}
        disabled={current <= min}
        onClick={() => onChange(String(Math.max(min, current - 1)))}
      >
        <Icon name="minus" size={18} />
      </button>
      <input
        id={id}
        className="control-input stepper__input"
        type="number"
        inputMode="numeric"
        min={min}
        step={1}
        value={value}
        placeholder="0"
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        onWheel={(event) => event.currentTarget.blur()}
      />
      <button
        type="button"
        className="stepper__button"
        aria-label={`Increase ${label}`}
        onClick={() => onChange(String(Math.max(min, current + 1)))}
      >
        <Icon name="plus" size={18} />
      </button>
    </div>
  );
}
