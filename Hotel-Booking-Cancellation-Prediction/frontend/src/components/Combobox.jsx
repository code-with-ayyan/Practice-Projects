import { useEffect, useId, useMemo, useRef, useState } from "react";
import Icon from "./Icons";

/**
 * Searchable dropdown following the ARIA 1.2 combobox pattern.
 * Type to filter, use ↑ ↓ to move, Enter to choose, Esc to close.
 */
export default function Combobox({
  id,
  options,
  value,
  onChange,
  onBlur,
  invalid,
  describedBy,
  placeholder = "Search or select",
}) {
  const listId = useId();
  const wrapperRef = useRef(null);
  const listRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [typing, setTyping] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const selected = options.find((option) => option.value === value) ?? null;

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!typing || !needle) return options;
    return options.filter((option) => option.label.toLowerCase().includes(needle));
  }, [options, query, typing]);

  const inputValue = typing ? query : selected?.label ?? "";

  function openList() {
    if (!open) {
      const index = options.findIndex((option) => option.value === value);
      setActiveIndex(index >= 0 ? index : 0);
      setOpen(true);
    }
  }

  function closeList() {
    setOpen(false);
    setTyping(false);
    setQuery("");
  }

  function choose(option) {
    onChange(option.value);
    closeList();
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) return openList();
      setActiveIndex((index) => Math.min(index + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) return openList();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      if (open) {
        event.preventDefault(); // don't submit the form while picking an option
        if (filtered[activeIndex]) choose(filtered[activeIndex]);
      }
    } else if (event.key === "Escape") {
      if (open) {
        event.preventDefault();
        closeList();
      }
    }
  }

  // Keep the highlighted option visible while navigating with the keyboard.
  useEffect(() => {
    if (!open) return;
    listRef.current?.children[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  // Close when focus leaves the whole widget.
  function handleBlur(event) {
    if (wrapperRef.current?.contains(event.relatedTarget)) return;
    closeList();
    onBlur?.();
  }

  const activeId =
    open && filtered[activeIndex] ? `${listId}-option-${activeIndex}` : undefined;

  return (
    <div className="combobox" ref={wrapperRef} onBlur={handleBlur}>
      <div className="control-shell">
        <input
          id={id}
          className="control-input"
          type="text"
          role="combobox"
          autoComplete="off"
          spellCheck={false}
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeId}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          placeholder={placeholder}
          value={inputValue}
          onClick={openList}
          onKeyDown={handleKeyDown}
          onChange={(event) => {
            setTyping(true);
            setQuery(event.target.value);
            setActiveIndex(0);
            setOpen(true);
          }}
        />
        <span className={`combobox__chevron${open ? " is-open" : ""}`} aria-hidden="true">
          <Icon name="chevron" size={18} />
        </span>
      </div>

      {open && (
        <ul className="combobox__list" id={listId} role="listbox" ref={listRef}>
          {filtered.length === 0 && (
            <li className="combobox__empty" role="presentation">
              No matching country
            </li>
          )}
          {filtered.map((option, index) => (
            <li
              key={option.value}
              id={`${listId}-option-${index}`}
              role="option"
              aria-selected={option.value === value}
              className={`combobox__option${index === activeIndex ? " is-active" : ""}`}
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => choose(option)}
            >
              <span>{option.label}</span>
              {option.value === value && <Icon name="check" size={16} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
