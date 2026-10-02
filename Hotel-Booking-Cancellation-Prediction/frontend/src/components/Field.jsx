import Icon from "./Icons";

/**
 * Shared wrapper for every input: label, plain-language description, the
 * control itself, and an accessible error message.
 *
 * `children` is a render function that receives the ids/aria props the
 * control needs, so label ↔ input ↔ description ↔ error stay linked.
 *
 * group=true renders a <fieldset>/<legend> (for radio groups);
 * otherwise a normal <label for=…>.
 */
export default function Field({
  name,
  label,
  description,
  error,
  group = false,
  span = 3,
  children,
}) {
  const inputId = `field-${name}`;
  const descId = `${name}-description`;
  const errorId = `${name}-error`;
  const describedBy =
    [description ? descId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  const control = children({ id: inputId, invalid: Boolean(error), describedBy });

  const body = (
    <>
      {description && (
        <p id={descId} className="field__description">
          {description}
        </p>
      )}
      {control}
      {error && (
        <p id={errorId} className="field__error">
          <Icon name="alert" size={16} />
          <span>{error}</span>
        </p>
      )}
    </>
  );

  const className = `field${error ? " field--invalid" : ""}`;
  const style = { "--span": span };

  if (group) {
    return (
      <fieldset
        className={className}
        style={style}
        data-field={name}
        aria-describedby={describedBy}
      >
        <legend className="field__label">{label}</legend>
        {body}
      </fieldset>
    );
  }

  return (
    <div className={className} style={style} data-field={name}>
      <label className="field__label" htmlFor={inputId}>
        {label}
      </label>
      {body}
    </div>
  );
}
