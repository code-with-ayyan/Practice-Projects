import { useEffect, useMemo, useRef, useState } from "react";
import ErrorBanner from "../components/ErrorBanner";
import FormField from "../components/FormField";
import PageHeader from "../components/PageHeader";
import ResultCard from "../components/ResultCard";
import SectionCard from "../components/SectionCard";
import TotalGuests from "../components/TotalGuests";
import {
  FIELD_BY_NAME,
  FIELD_ORDER,
  SECTIONS,
  getExampleValues,
  getInitialValues,
} from "../data/fields";
import { ApiError, predictCancellation } from "../services/api";
import { buildPayload, sumGuests } from "../services/payload";
import { validateAll } from "../services/validation";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function scrollToElement(element, block = "center") {
  element?.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block,
  });
}

/** Scrolls to a field and moves keyboard focus into it. */
function focusField(name) {
  const root = document.querySelector(`[data-field="${name}"]`);
  if (!root) return;
  root.querySelector("input:not([disabled])")?.focus({ preventScroll: true });
  scrollToElement(root, "center");
}

function firstFieldWithIssue(names) {
  return FIELD_ORDER.find((name) => names.includes(name));
}

export default function PredictionPage() {
  const [values, setValues] = useState(getInitialValues);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
  const [status, setStatus] = useState("idle"); // "idle" | "loading"
  const [result, setResult] = useState(null); // { prediction, probability, payload }
  const [banner, setBanner] = useState(null); // API error: { title, message, issues }

  const submittingRef = useRef(false); // blocks double submissions
  const resultRef = useRef(null);
  const bannerRef = useRef(null);

  const errors = useMemo(() => validateAll(values), [values]);
  const totalGuests = useMemo(() => sumGuests(values), [values]);
  const loading = status === "loading";

  // Live list of fields that still need attention (shown after a failed submit).
  const clientIssues = submitAttempted
    ? FIELD_ORDER.filter((name) => errors[name]).map((name) => ({
        name,
        label: FIELD_BY_NAME[name].label,
        message: errors[name],
      }))
    : [];
  const activeBanner =
    clientIssues.length > 0
      ? {
          title: "Some details need attention",
          message: "Fix the highlighted fields, then run the prediction again.",
          issues: clientIssues,
        }
      : banner;

  // Bring a fresh result / API error into view.
  useEffect(() => {
    if (!result) return;
    scrollToElement(resultRef.current, "start");
    resultRef.current?.focus({ preventScroll: true });
  }, [result]);

  useEffect(() => {
    if (!banner) return;
    scrollToElement(bannerRef.current, "nearest");
    bannerRef.current?.focus({ preventScroll: true });
  }, [banner]);

  function fieldError(name) {
    if (serverErrors[name]) return serverErrors[name];
    return submitAttempted || touched[name] ? errors[name] : undefined;
  }

  function handleChange(name, next) {
    setValues((current) => ({ ...current, [name]: next }));
    setServerErrors((current) => {
      if (!(name in current)) return current;
      const { [name]: _removed, ...rest } = current;
      return rest;
    });
    setResult(null); // an edited booking invalidates the previous prediction
  }

  function handleBlur(name) {
    setTouched((current) => (current[name] ? current : { ...current, [name]: true }));
  }

  function clearFeedback() {
    setTouched({});
    setSubmitAttempted(false);
    setServerErrors({});
    setBanner(null);
    setResult(null);
  }

  function resetForm() {
    setValues(getInitialValues());
    clearFeedback();
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }

  function loadExample() {
    setValues(getExampleValues());
    clearFeedback();
    scrollToElement(document.getElementById("booking-form"), "start");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submittingRef.current) return; // a request is already running

    setSubmitAttempted(true);
    setResult(null);

    const invalidNames = Object.keys(errors);
    if (invalidNames.length > 0) {
      setBanner(null);
      focusField(firstFieldWithIssue(invalidNames));
      return;
    }

    submittingRef.current = true;
    setStatus("loading");
    setBanner(null);
    setServerErrors({});

    const payload = buildPayload(values);

    try {
      const { prediction, probability } = await predictCancellation(payload);
      setResult({ prediction, probability, payload });
    } catch (error) {
      const apiError =
        error instanceof ApiError
          ? error
          : new ApiError({
              kind: "unexpected",
              title: "Something went wrong",
              message: "An unexpected error occurred. Please try again.",
            });

      setBanner({
        title: apiError.title,
        message: apiError.message,
        issues: apiError.issues,
      });

      if (apiError.issues.length > 0) {
        setServerErrors(
          Object.fromEntries(apiError.issues.map((issue) => [issue.name, issue.message])),
        );
        focusField(firstFieldWithIssue(apiError.issues.map((issue) => issue.name)));
      }
    } finally {
      submittingRef.current = false;
      setStatus("idle");
    }
  }

  return (
    <>
      <PageHeader onLoadExample={loadExample} />

      <main className="container form-wrap">
        <form id="booking-form" noValidate onSubmit={handleSubmit} aria-busy={loading}>
          <div className="sections">
            {SECTIONS.map((section) => (
              <SectionCard key={section.id} section={section}>
                {section.fields.map((field) =>
                  field.control === "totalGuests" ? (
                    <div
                      key={field.name}
                      className="field field--summary"
                      style={{ "--span": field.span }}
                    >
                      <TotalGuests total={totalGuests} />
                    </div>
                  ) : (
                    <FormField
                      key={field.name}
                      config={field}
                      value={values[field.name]}
                      error={fieldError(field.name)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  ),
                )}
              </SectionCard>
            ))}
          </div>

          <section className="predict" aria-labelledby="predict-title">
            <div className="predict__bar">
              <div className="predict__copy">
                <h2 id="predict-title" className="predict__title">
                  Run the prediction
                </h2>
                <p className="predict__text">
                  The model reviews the booking details above and returns whether the
                  reservation is likely to be canceled.
                </p>
              </div>
              <div className="predict__actions">
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={resetForm}
                  disabled={loading}
                >
                  Reset Form
                </button>
                <button type="submit" className="btn btn--primary" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner" aria-hidden="true" />
                      Analyzing Booking...
                    </>
                  ) : (
                    "Predict Cancellation Risk"
                  )}
                </button>
              </div>
            </div>

            <p className="sr-only" role="status">
              {loading ? "Analyzing booking" : ""}
            </p>

            {activeBanner && (
              <ErrorBanner
                ref={bannerRef}
                title={activeBanner.title}
                message={activeBanner.message}
                issues={activeBanner.issues}
                onIssueClick={focusField}
              />
            )}

            {result && (
              <ResultCard
                ref={resultRef}
                prediction={result.prediction}
                probability={result.probability}
                payload={result.payload}
                onReset={resetForm}
              />
            )}
          </section>
        </form>
      </main>

      <footer className="container footer">
        <p>
          Predictions come from a trained machine-learning model. Use them to support,
          not replace, your own judgment.
        </p>
      </footer>
    </>
  );
}
