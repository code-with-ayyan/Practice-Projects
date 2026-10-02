/**
 * Number input with an optional prefix (e.g. a currency symbol) or suffix
 * (e.g. "days"). The affix is display-only and is never sent to the API.
 */
export default function AffixInput({
  id,
  value,
  onChange,
  onBlur,
  invalid,
  describedBy,
  prefix,
  suffix,
  step = 1,
  min = 0,
  inputMode = "numeric",
  placeholder,
}) {
  return (
    <div className="control-shell">
      {prefix && (
        <span className="affix affix--prefix" aria-hidden="true">
          {prefix}
        </span>
      )}
      <input
        id={id}
        className="control-input"
        type="number"
        inputMode={inputMode}
        min={min}
        step={step}
        value={value}
        placeholder={placeholder}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        onWheel={(event) => event.currentTarget.blur()}
      />
      {suffix && (
        <span className="affix affix--suffix" aria-hidden="true">
          {suffix}
        </span>
      )}
    </div>
  );
}
