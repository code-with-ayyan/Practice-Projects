import { CURRENCY_SYMBOL } from "../config";
import AffixInput from "./AffixInput";
import Combobox from "./Combobox";
import Field from "./Field";
import OptionGroup from "./OptionGroup";
import Stepper from "./Stepper";

/**
 * Renders one form field from its config in data/fields.js.
 * Keeping this in one place guarantees every field gets the same label,
 * description, validation message and accessibility wiring.
 */
export default function FormField({ config, value, error, onChange, onBlur }) {
  const { name, label, description, control, span } = config;
  const isGroup = control === "options";

  return (
    <Field
      name={name}
      label={label}
      description={description}
      error={error}
      group={isGroup}
      span={span}
    >
      {({ id, invalid, describedBy }) => {
        const common = {
          id,
          invalid,
          describedBy,
          value,
          onChange: (next) => onChange(name, next),
          onBlur: () => onBlur(name),
        };

        switch (control) {
          case "options":
            return (
              <OptionGroup
                name={name}
                options={config.options}
                variant={config.variant}
                value={value}
                onChange={common.onChange}
              />
            );
          case "combobox":
            return (
              <Combobox
                {...common}
                options={config.options}
                placeholder={config.placeholder}
              />
            );
          case "stepper":
            return <Stepper {...common} label={label} />;
          case "currency":
            return (
              <AffixInput
                {...common}
                prefix={CURRENCY_SYMBOL}
                step="0.01"
                inputMode="decimal"
                placeholder={config.placeholder}
              />
            );
          case "number":
            return (
              <AffixInput
                {...common}
                suffix={config.suffix}
                placeholder={config.placeholder}
              />
            );
          default:
            return null;
        }
      }}
    </Field>
  );
}
