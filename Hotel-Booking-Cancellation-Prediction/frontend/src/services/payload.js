import { API_FIELDS, FIELD_BY_NAME } from "../data/fields";
import { parseNumber } from "./validation";

/**
 * Turns the UI form state into the exact JSON body the backend expects.
 *  - Only the fields in API_FIELDS are sent (never `total_guests`).
 *  - Counts become integers, ADR becomes a plain number (no currency symbol).
 *  - Categorical fields already hold the exact backend value (e.g. "BB",
 *    "TA/TO", 1, 0) — friendly labels only exist in the UI.
 * Call validateAll() first; this function assumes the values are valid.
 */
export function buildPayload(values) {
  const payload = {};
  for (const name of API_FIELDS) {
    const field = FIELD_BY_NAME[name];
    const value = values[name];
    payload[name] = field.valueType === "enum" ? value : parseNumber(value);
  }
  return payload;
}

/** Live total shown in the UI. The backend recomputes its own total_guests. */
export function sumGuests(values) {
  return ["adults", "children", "babies"].reduce((sum, name) => {
    const number = parseNumber(values[name]);
    return sum + (Number.isFinite(number) && number > 0 ? Math.floor(number) : 0);
  }, 0);
}
