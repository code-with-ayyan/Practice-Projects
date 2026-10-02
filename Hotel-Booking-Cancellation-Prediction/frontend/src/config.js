// ---------------------------------------------------------------------------
// Central configuration. Change the API address here — or, better, without
// touching code, by setting VITE_API_URL in frontend/.env (see .env.example).
// ---------------------------------------------------------------------------

export const API_URL = (
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

/** Milliseconds to wait for the prediction service before giving up. */
export const REQUEST_TIMEOUT_MS = 30_000;

/** Display-only symbol for the ADR field. It is never sent to the API. */
export const CURRENCY_SYMBOL = "$";
