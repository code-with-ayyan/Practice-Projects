// Every option keeps two things apart:
//   value → the EXACT string/number the FastAPI backend expects (sent to the API)
//   label → the friendly text the user sees
// Never show `value` to the user and never send `label` to the API.

export const HOTEL_OPTIONS = [
  { value: "City Hotel", label: "City Hotel", icon: "city" },
  { value: "Resort Hotel", label: "Resort Hotel", icon: "resort" },
];

export const MEAL_OPTIONS = [
  {
    value: "BB",
    label: "Bed & Breakfast",
    description: "Breakfast is included with the booking.",
  },
  {
    value: "FB",
    label: "Full Board",
    description: "Breakfast, lunch and dinner are included.",
  },
  {
    value: "HB",
    label: "Half Board",
    description: "Breakfast plus one main meal, usually lunch or dinner.",
  },
  {
    value: "SC",
    label: "Self Catering",
    description: "No regular meals are included.",
  },
  {
    value: "Undefined",
    label: "Undefined",
    description: "Meal arrangement was not specified.",
  },
];

export const COUNTRY_OPTIONS = [
  { value: "Belgium", label: "Belgium" },
  { value: "Brazil", label: "Brazil" },
  { value: "France", label: "France" },
  { value: "Germany", label: "Germany" },
  { value: "Ireland", label: "Ireland" },
  { value: "Italy", label: "Italy" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "Portugal", label: "Portugal" },
  { value: "Spain", label: "Spain" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "others", label: "Other countries" },
];

export const MARKET_SEGMENT_OPTIONS = [
  {
    value: "Aviation",
    label: "Aviation",
    description: "Bookings associated with airline or aviation-related travel.",
  },
  {
    value: "Complementary",
    label: "Complementary",
    description:
      "Complimentary bookings provided without a standard room charge.",
  },
  {
    value: "Corporate",
    label: "Corporate",
    description: "Bookings associated with corporate or business customers.",
  },
  {
    value: "Direct",
    label: "Direct",
    description: "Bookings made directly with the hotel.",
  },
  {
    value: "Groups",
    label: "Groups",
    description: "Bookings made for groups of guests.",
  },
  {
    value: "Offline TA/TO",
    label: "Offline Travel Agent / Tour Operator",
    description:
      "Bookings made through an offline travel agent or tour operator.",
  },
  {
    value: "Online TA",
    label: "Online Travel Agency",
    description: "Bookings made through an online travel agency.",
  },
];

export const DISTRIBUTION_CHANNEL_OPTIONS = [
  { value: "Corporate", label: "Corporate" },
  { value: "Direct", label: "Direct" },
  { value: "GDS", label: "Global Distribution System (GDS)" },
  { value: "TA/TO", label: "Travel Agent / Tour Operator (TA/TO)" },
  { value: "Undefined", label: "Undefined" },
];

// The backend expects the integers 1 and 0 — the user only ever sees Yes / No.
export const YES_NO_OPTIONS = [
  { value: 1, label: "Yes" },
  { value: 0, label: "No" },
];

export const DEPOSIT_TYPE_OPTIONS = [
  {
    value: "No Deposit",
    label: "No Deposit",
    description: "No deposit was required.",
  },
  {
    value: "Non Refund",
    label: "Non-Refundable",
    description: "Deposit/payment is non-refundable.",
  },
  {
    value: "Refundable",
    label: "Refundable",
    description:
      "Deposit can be refunded according to the booking conditions.",
  },
];

export const CUSTOMER_TYPE_OPTIONS = [
  {
    value: "Contract",
    label: "Contract",
    description: "Booking associated with a contract or long-term agreement.",
  },
  {
    value: "Group",
    label: "Group",
    description: "Booking made for a group.",
  },
  {
    value: "Transient",
    label: "Transient",
    description: "Individual booking without a long-term contract.",
  },
  {
    value: "Transient-Party",
    label: "Transient Party",
    description:
      "Individual/group booking with characteristics of a transient-party booking.",
  },
];

// Helper: look up the friendly label for a backend value.
export function labelFor(options, value) {
  return options.find((option) => option.value === value)?.label ?? String(value);
}
