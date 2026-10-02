import Icon from "./Icons";

/**
 * Accessible radio group rendered as selectable cards / tiles / chips /
 * a segmented control. Uses real <input type="radio"> elements, so keyboard
 * arrows, screen readers and form semantics all work natively.
 *
 * variant: "cards" (title + description) | "tiles" (icon + title)
 *          | "chips" (compact pills) | "segmented" (Yes / No)
 */
export default function OptionGroup({
  name,
  options,
  value,
  onChange,
  variant = "cards",
}) {
  return (
    <div className={`options options--${variant}`}>
      {options.map((option) => {
        const checked = value === option.value;
        return (
          <label key={String(option.value)} className="option">
            <input
              className="option__input"
              type="radio"
              name={`option-${name}`}
              checked={checked}
              onChange={() => onChange(option.value)}
            />
            <span className="option__body">
              {variant === "cards" && <span className="option__mark" aria-hidden="true" />}
              {variant === "tiles" && option.icon && (
                <span className="option__icon" aria-hidden="true">
                  <Icon name={option.icon} size={26} />
                </span>
              )}
              <span className="option__text">
                <span className="option__title">{option.label}</span>
                {option.description && (
                  <span className="option__description">{option.description}</span>
                )}
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
}
