import { API_URL, REQUEST_TIMEOUT_MS } from "../config";
import { FIELD_BY_NAME } from "../data/fields";

/** A user-friendly error. Never carries a raw stack trace. */
export class ApiError extends Error {
  constructor({ kind, title, message, status = null, issues = [] }) {
    super(message);
    this.name = "ApiError";
    this.kind = kind; // network | timeout | validation | server | http | invalid_response | unexpected
    this.title = title;
    this.status = status;
    this.issues = issues; // [{ name, label, message }] — set for HTTP 422
  }
}

/** FastAPI 422 → [{ name, label, message }], one per offending field. */
function parseValidationIssues(body) {
  const detail = Array.isArray(body?.detail) ? body.detail : [];
  const issues = [];
  for (const item of detail) {
    const loc = Array.isArray(item?.loc) ? item.loc : [];
    const name = loc.find((part) => typeof part === "string" && part in FIELD_BY_NAME);
    if (!name || issues.some((issue) => issue.name === name)) continue;
    const raw = typeof item.msg === "string" ? item.msg : "Invalid value.";
    issues.push({
      name,
      label: FIELD_BY_NAME[name].label,
      message: raw.charAt(0).toUpperCase() + raw.slice(1),
    });
  }
  return issues;
}

async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

/**
 * The backend sends the cancellation probability as `cancellation_probability`.
 * A few common alternative names are accepted too, so the ring still appears if
 * your backend uses a slightly different key. Returns a fraction 0–1, or null.
 */
const PROBABILITY_KEYS = [
  "cancellation_probability",
  "probability",
  "cancel_probability",
  "cancellation_prob",
  "probability_of_cancellation",
  "prob",
  "proba",
  "probabilities",
  "predict_proba",
];

function toFraction(raw) {
  let value = raw;
  // [P(not canceled), P(canceled)] → take the "canceled" entry (class 1)
  if (Array.isArray(value)) value = value.length >= 2 ? value[1] : value[0];
  // Accept a wrapped value like [[0.3, 0.7]] as well.
  if (Array.isArray(value)) value = value.length >= 2 ? value[1] : value[0];

  let isPercentText = false;
  if (typeof value === "string") {
    const text = value.trim();
    isPercentText = text.endsWith("%");
    value = text === "" ? NaN : Number(text.replace("%", ""));
  }

  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return null;
  if (isPercentText) return value <= 100 ? value / 100 : null;
  if (value <= 1) return value; // already a fraction (0.734)
  if (value <= 100) return value / 100; // a percentage (73.4)
  return null;
}

function readProbability(body) {
  if (!body || typeof body !== "object") return null;
  for (const key of PROBABILITY_KEYS) {
    if (key in body) {
      const fraction = toFraction(body[key]);
      if (fraction !== null) return fraction;
    }
  }
  return null;
}

/**
 * POST /predict  →  resolves with { prediction: 0 | 1, probability: number | null }.
 * `probability` is the cancellation probability as a fraction (0–1), or null
 * if the backend did not send a valid one.
 * Rejects with an ApiError for every failure mode.
 */
export async function predictCancellation(payload) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new ApiError({
        kind: "timeout",
        title: "The prediction service took too long",
        message: "No answer arrived in time. Please try again in a moment.",
      });
    }
    throw new ApiError({
      kind: "network",
      title: "Can't reach the prediction service",
      message: `Make sure the backend is running at ${API_URL}, then try again.`,
    });
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 422) {
    const issues = parseValidationIssues(await readJson(response));
    throw new ApiError({
      kind: "validation",
      title: "The service rejected some details",
      message: issues.length
        ? "Please correct the fields below and try again."
        : "Please review the booking details and try again.",
      status: 422,
      issues,
    });
  }

  if (response.status >= 500) {
    throw new ApiError({
      kind: "server",
      title: "The prediction service ran into a problem",
      message:
        "Something went wrong while analyzing this booking. Try again, or check the backend logs if it keeps happening.",
      status: response.status,
    });
  }

  if (!response.ok) {
    throw new ApiError({
      kind: "http",
      title: "Unexpected response from the service",
      message: `The service replied with status ${response.status}. Check that the API address is correct.`,
      status: response.status,
    });
  }

  const body = await readJson(response);
  const prediction = body?.prediction;
  if (prediction !== 0 && prediction !== 1) {
    throw new ApiError({
      kind: "invalid_response",
      title: "The service returned an unreadable result",
      message:
        "The response did not contain a valid prediction. Check that the backend matches the expected API.",
      status: response.status,
    });
  }

  return { prediction, probability: readProbability(body) };
}
