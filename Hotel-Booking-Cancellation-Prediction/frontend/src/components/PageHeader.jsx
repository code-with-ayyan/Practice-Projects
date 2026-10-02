import Icon from "./Icons";

export default function PageHeader({ onLoadExample }) {
  return (
    <header className="hero">
      <div className="container">
        <span className="badge">
          <Icon name="sparkle" size={16} />
          Machine Learning Powered
        </span>
        <h1 className="hero__title">Hotel Booking Cancellation Predictor</h1>
        <p className="hero__lead">
          Predict whether a hotel reservation is likely to be canceled using
          booking, guest, and reservation information.
        </p>
        <div className="hero__actions">
          <button type="button" className="btn btn--light" onClick={onLoadExample}>
            Load example booking
          </button>
        </div>
      </div>
    </header>
  );
}
