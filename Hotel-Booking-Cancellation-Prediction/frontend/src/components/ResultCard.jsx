import { forwardRef } from "react";
import { CURRENCY_SYMBOL } from "../config";
import {
  CUSTOMER_TYPE_OPTIONS,
  DEPOSIT_TYPE_OPTIONS,
  HOTEL_OPTIONS,
  labelFor,
} from "../data/options";
import Icon from "./Icons";

// `prediction` is the class (0 or 1). `probability` is the model's own
// cancellation probability from the backend (0–1) — or null when the backend
// could not provide one, in which case nothing is shown (never a made-up number).
const OUTCOMES = {
  0: {
    tone: "safe",
    icon: "shield",
    title: "Booking Predicted Not to Be Canceled",
    text: "Based on the details provided, the model expects this reservation to go ahead.",
  },
  1: {
    tone: "risk",
    icon: "alert",
    title: "Cancellation Predicted",
    text: "Based on the details provided, the model expects this reservation to be canceled.",
  },
};

const formatPercent = (fraction) => `${(fraction * 100).toFixed(1)}%`;

const RING_SIZE = 148;
const RING_STROKE = 14;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/** Circular gauge: the arc length is the cancellation probability. */
function ProbabilityRing({ probability }) {
  const percent = formatPercent(probability);
  const center = RING_SIZE / 2;
  return (
    <div
      className="ring"
      role="meter"
      aria-label="Cancellation probability"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(probability * 100)}
      aria-valuetext={percent}
    >
      <svg
        className="ring__svg"
        viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
        width={RING_SIZE}
        height={RING_SIZE}
        aria-hidden="true"
        focusable="false"
      >
        <circle
          className="ring__track"
          cx={center}
          cy={center}
          r={RING_RADIUS}
          strokeWidth={RING_STROKE}
        />
        <circle
          className="ring__value"
          cx={center}
          cy={center}
          r={RING_RADIUS}
          strokeWidth={RING_STROKE}
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE * (1 - probability)}
          style={{ "--ring-circumference": RING_CIRCUMFERENCE }}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <div className="ring__label">
        <strong>{percent}</strong>
        <span>cancel</span>
      </div>
    </div>
  );
}

const plural = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`;

function buildSummary(payload) {
  const nights = payload.stays_in_weekend_nights + payload.stays_in_week_nights;
  const guests = payload.adults + payload.children + payload.babies;
  return [
    ["Hotel", labelFor(HOTEL_OPTIONS, payload.hotel)],
    [
      "Length of stay",
      `${plural(nights, "night")} (${payload.stays_in_weekend_nights} weekend, ${payload.stays_in_week_nights} week)`,
    ],
    ["Guests", plural(guests, "guest")],
    ["Lead time", plural(payload.lead_time, "day")],
    ["Deposit", labelFor(DEPOSIT_TYPE_OPTIONS, payload.deposit_type)],
    ["Customer type", labelFor(CUSTOMER_TYPE_OPTIONS, payload.customer_type)],
    [
      "Average daily rate",
      `${CURRENCY_SYMBOL}${payload.adr.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    ],
  ];
}

const ResultCard = forwardRef(function ResultCard({ prediction, probability, payload, onReset }, ref) {
  const outcome = OUTCOMES[prediction];
  const summary = buildSummary(payload);
  const hasProbability = typeof probability === "number";

  return (
    <article
      className={`slip slip--${outcome.tone}`}
      ref={ref}
      tabIndex={-1}
      aria-labelledby="result-title"
    >
      <div className="slip__main" role="status">
        <span className="slip__medal" aria-hidden="true">
          <Icon name={outcome.icon} size={34} strokeWidth={1.8} />
        </span>
        <div>
          <h3 id="result-title" className="slip__title">
            {outcome.title}
          </h3>
          <p className="slip__text">{outcome.text}</p>
        </div>
      </div>

      {hasProbability && (
        <div className="slip__probability">
          <ProbabilityRing probability={probability} />
          <div className="slip__probability-copy">
            <p className="slip__probability-title">Cancellation probability</p>
            <p className="slip__probability-hint">
              The model's estimated chance that this booking is canceled.
            </p>
            <dl className="slip__probability-split">
              <div>
                <dt>Canceled</dt>
                <dd>{formatPercent(probability)}</dd>
              </div>
              <div>
                <dt>Not canceled</dt>
                <dd>{formatPercent(1 - probability)}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      <div className="slip__tear" aria-hidden="true" />

      <dl className="slip__details">
        {summary.map(([term, detail]) => (
          <div key={term} className="slip__detail">
            <dt>{term}</dt>
            <dd>{detail}</dd>
          </div>
        ))}
      </dl>

      <div className="slip__footer">
        <p className="slip__note">
          <Icon name="info" size={16} />
          <span>
            {hasProbability
              ? "This is the model's estimate for this booking, not a guarantee."
              : "The model returned a yes/no prediction only, so no probability is shown."}
          </span>
        </p>
        <button type="button" className="btn btn--ghost" onClick={onReset}>
          <Icon name="refresh" size={18} />
          New Prediction
        </button>
      </div>
    </article>
  );
});

export default ResultCard;
