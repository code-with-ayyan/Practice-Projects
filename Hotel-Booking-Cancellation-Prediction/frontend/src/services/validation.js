import { FIELDS } from "../data/fields";

/**
 * Frontend validation mirrors the backend (Pydantic) rules:
 *   int fields   → whole number, ≥ 0
 *   adr          → number, ≥ 0
 *   enum fields  → must be one of the allowed backend values
 * The backend stays the final authority.
 */

/** Returns null for empty input, NaN for junk, otherwise the number. */
export function parseNumber(raw) {
  const text = String(raw ?? "").trim();
  if (text === "") return null;
  const value = Number(text);
  return Number.isFinite(value) ? value : NaN;
}

export function validateField(field, value) {
  if (field.valueType === "enum") {
    const allowed = field.options.map((option) => option.value);
    return allowed.includes(value)
      ? null
      : field.requiredMessage ?? "Please choose an option.";
  }

  const number = parseNumber(value);
  if (number === null) return "Enter a value.";
  if (Number.isNaN(number)) return "Enter a valid number.";
  if (number < 0) return "Cannot be negative.";

  if (field.valueType === "int") {
    if (!Number.isInteger(number)) return "Enter a whole number.";
    if (number > Number.MAX_SAFE_INTEGER) return "That number is too large.";
  }
  return null;
}

/** Returns { fieldName: message } for every invalid field (empty = valid). */
export function validateAll(values) {
  const errors = {};
  for (const field of FIELDS) {
    const message = validateField(field, values[field.name]);
    if (message) errors[field.name] = message;
  }
  return errors;
}
