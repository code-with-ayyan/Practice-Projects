import { forwardRef } from "react";
import Icon from "./Icons";

/**
 * Friendly error message. `issues` (optional) lists the fields that need
 * attention; each one jumps to the field when clicked.
 */
const ErrorBanner = forwardRef(function ErrorBanner({ title, message, issues = [], onIssueClick }, ref) {
  return (
    <div className="alert" role="alert" ref={ref} tabIndex={-1}>
      <span className="alert__icon" aria-hidden="true">
        <Icon name="alert" size={22} />
      </span>
      <div className="alert__body">
        <p className="alert__title">{title}</p>
        {message && <p className="alert__message">{message}</p>}
        {issues.length > 0 && (
          <ul className="alert__issues">
            {issues.map((issue) => (
              <li key={issue.name}>
                <button
                  type="button"
                  className="alert__chip"
                  onClick={() => onIssueClick?.(issue.name)}
                  title={issue.message}
                >
                  {issue.label}
                  {issue.message ? `: ${issue.message}` : ""}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

export default ErrorBanner;
