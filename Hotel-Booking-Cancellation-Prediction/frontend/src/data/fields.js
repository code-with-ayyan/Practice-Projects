import {
  COUNTRY_OPTIONS,
  CUSTOMER_TYPE_OPTIONS,
  DEPOSIT_TYPE_OPTIONS,
  DISTRIBUTION_CHANNEL_OPTIONS,
  HOTEL_OPTIONS,
  MARKET_SEGMENT_OPTIONS,
  MEAL_OPTIONS,
  YES_NO_OPTIONS,
} from "./options";

/**
 * The exact request body accepted by POST /predict, in contract order.
 * `total_guests` is intentionally NOT here: the backend calculates it.
 */
export const API_FIELDS = [
  "hotel",
  "lead_time",
  "stays_in_weekend_nights",
  "stays_in_week_nights",
  "adults",
  "children",
  "babies",
  "meal",
  "country",
  "market_segment",
  "distribution_channel",
  "is_repeated_guest",
  "previous_cancellations",
  "previous_bookings_not_canceled",
  "booking_changes",
  "deposit_type",
  "customer_type",
  "adr",
  "required_car_parking_spaces",
  "total_of_special_requests",
  "room_type_changed",
];

/**
 * Field config keys
 *   name        backend field name
 *   control     which UI control renders it
 *   valueType   "enum" | "int" | "float"  → how it is validated / sent
 *   span        width on the 6-column grid (2 = a third, 3 = half, 6 = full)
 */
export const SECTIONS = [
  {
    id: "booking",
    title: "Booking Information",
    description:
      "Which hotel the reservation is for and how far ahead and how long the guest is staying.",
    icon: "calendar",
    fields: [
      {
        name: "hotel",
        label: "Hotel",
        description: "Choose the type of hotel where the booking was made.",
        control: "options",
        variant: "tiles",
        valueType: "enum",
        options: HOTEL_OPTIONS,
        requiredMessage: "Choose a hotel type.",
        span: 6,
      },
      {
        name: "lead_time",
        label: "Lead Time",
        description:
          "Number of days between the booking date and the guest's arrival date.",
        control: "number",
        valueType: "int",
        suffix: "days",
        placeholder: "e.g. 45",
        span: 2,
      },
      {
        name: "stays_in_weekend_nights",
        label: "Weekend Nights",
        description:
          "Number of Saturday and Sunday nights included in the booking.",
        control: "stepper",
        valueType: "int",
        span: 2,
      },
      {
        name: "stays_in_week_nights",
        label: "Week Nights",
        description:
          "Number of Monday through Friday nights included in the booking.",
        control: "stepper",
        valueType: "int",
        span: 2,
      },
    ],
  },
  {
    id: "guest",
    title: "Guest Information",
    description: "Who is travelling, where they are from, and what kind of customer they are.",
    icon: "users",
    fields: [
      {
        name: "adults",
        label: "Adults",
        description: "Number of adults included in the booking.",
        control: "stepper",
        valueType: "int",
        span: 2,
      },
      {
        name: "children",
        label: "Children",
        description: "Number of children included in the booking.",
        control: "stepper",
        valueType: "int",
        span: 2,
      },
      {
        name: "babies",
        label: "Babies",
        description: "Number of babies included in the booking.",
        control: "stepper",
        valueType: "int",
        span: 2,
      },
      // Read-only, live summary. Not an API field — the backend adds
      // total_guests itself, so it is never part of the request payload.
      { name: "total_guests_summary", control: "totalGuests", virtual: true, span: 6 },
      {
        name: "country",
        label: "Country",
        description: "Country where the guest or booking originated.",
        control: "combobox",
        valueType: "enum",
        options: COUNTRY_OPTIONS,
        placeholder: "Search or select a country",
        requiredMessage: "Select a country.",
        span: 6,
      },
      {
        name: "customer_type",
        label: "Customer Type",
        description: "The kind of customer who made the booking.",
        control: "options",
        variant: "cards",
        valueType: "enum",
        options: CUSTOMER_TYPE_OPTIONS,
        requiredMessage: "Choose a customer type.",
        span: 6,
      },
    ],
  },
  {
    id: "history",
    title: "Booking History",
    description:
      "What we know about this guest's earlier bookings and any changes made to this one.",
    icon: "history",
    fields: [
      {
        name: "is_repeated_guest",
        label: "Is this a repeat guest?",
        description: "Indicates whether the guest has stayed at the hotel before.",
        control: "options",
        variant: "segmented",
        valueType: "enum",
        options: YES_NO_OPTIONS,
        requiredMessage: "Choose Yes or No.",
        span: 3,
      },
      {
        name: "room_type_changed",
        label: "Room Type Changed",
        description:
          "Indicates whether the guest changed the originally requested room type.",
        control: "options",
        variant: "segmented",
        valueType: "enum",
        options: YES_NO_OPTIONS,
        requiredMessage: "Choose Yes or No.",
        span: 3,
      },
      {
        name: "previous_cancellations",
        label: "Previous Cancellations",
        description: "Number of bookings previously canceled by this guest.",
        control: "stepper",
        valueType: "int",
        span: 2,
      },
      {
        name: "previous_bookings_not_canceled",
        label: "Previous Bookings Not Canceled",
        description:
          "Number of previous bookings made by this guest that were not canceled.",
        control: "stepper",
        valueType: "int",
        span: 2,
      },
      {
        name: "booking_changes",
        label: "Booking Changes",
        description:
          "Number of changes made to this booking after it was created.",
        control: "stepper",
        valueType: "int",
        span: 2,
      },
    ],
  },
  {
    id: "source",
    title: "Booking Source",
    description: "How the reservation found its way to the hotel.",
    icon: "route",
    fields: [
      {
        name: "market_segment",
        label: "Market Segment",
        description: "The type of business or customer group behind the booking.",
        control: "options",
        variant: "cards",
        valueType: "enum",
        options: MARKET_SEGMENT_OPTIONS,
        requiredMessage: "Choose a market segment.",
        span: 6,
      },
      {
        name: "distribution_channel",
        label: "Distribution Channel",
        description: "Channel through which the booking reached the hotel.",
        control: "options",
        variant: "chips",
        valueType: "enum",
        options: DISTRIBUTION_CHANNEL_OPTIONS,
        requiredMessage: "Choose a distribution channel.",
        span: 6,
      },
    ],
  },
  {
    id: "payment",
    title: "Stay & Payment",
    description: "Meals, deposit terms, room rate and extras attached to the stay.",
    icon: "wallet",
    fields: [
      {
        name: "meal",
        label: "Meal",
        description: "The meal plan included with the booking.",
        control: "options",
        variant: "cards",
        valueType: "enum",
        options: MEAL_OPTIONS,
        requiredMessage: "Choose a meal plan.",
        span: 6,
      },
      {
        name: "deposit_type",
        label: "Deposit Type",
        description: "The deposit terms agreed for this booking.",
        control: "options",
        variant: "cards",
        valueType: "enum",
        options: DEPOSIT_TYPE_OPTIONS,
        requiredMessage: "Choose a deposit type.",
        span: 6,
      },
      {
        name: "adr",
        label: "Average Daily Rate (ADR)",
        description: "Average price charged per occupied room per night.",
        control: "currency",
        valueType: "float",
        placeholder: "0.00",
        span: 2,
      },
      {
        name: "required_car_parking_spaces",
        label: "Required Car Parking Spaces",
        description: "Number of parking spaces requested for this booking.",
        control: "stepper",
        valueType: "int",
        span: 2,
      },
      {
        name: "total_of_special_requests",
        label: "Special Requests",
        description:
          "Number of special requests made by the guest, such as room preferences or other arrangements.",
        control: "stepper",
        valueType: "int",
        span: 2,
      },
    ],
  },
];

/** Only real API fields (the virtual "Total Guests" summary is excluded). */
export const FIELDS = SECTIONS.flatMap((section) =>
  section.fields.filter((field) => !field.virtual),
);

export const FIELD_BY_NAME = Object.fromEntries(
  FIELDS.map((field) => [field.name, field]),
);

/** Order used when jumping to the first invalid field. */
export const FIELD_ORDER = FIELDS.map((field) => field.name);

/**
 * Form state holds raw UI values:
 *   enum fields   → the backend value, or null while nothing is selected
 *   int/float     → a string, so the user can type freely ("" = empty)
 */
export function getInitialValues() {
  const values = {};
  for (const field of FIELDS) {
    if (field.valueType === "enum") values[field.name] = null;
    else if (field.control === "stepper") values[field.name] = "0";
    else values[field.name] = "";
  }
  return values;
}

/** A ready-made booking (the example from the API contract) for quick testing. */
export function getExampleValues() {
  return {
    hotel: "City Hotel",
    lead_time: "45",
    stays_in_weekend_nights: "2",
    stays_in_week_nights: "4",
    adults: "2",
    children: "1",
    babies: "0",
    meal: "BB",
    country: "France",
    market_segment: "Online TA",
    distribution_channel: "TA/TO",
    is_repeated_guest: 0,
    previous_cancellations: "0",
    previous_bookings_not_canceled: "1",
    booking_changes: "1",
    deposit_type: "No Deposit",
    customer_type: "Transient",
    adr: "120.5",
    required_car_parking_spaces: "1",
    total_of_special_requests: "2",
    room_type_changed: 0,
  };
}
