import React from "react";
import cn from "classnames";
import styles from "./radio/radio.module.css";

const classes = {
  root: "px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0",
  normal:
    "bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent",
  solid:
    "bg-gray-100 border border-border-100 focus:bg-light focus:border-accent",
  outline: "border border-border-base focus:border-accent",
  shadow: "focus:shadow",
  readOnly: "bg-gray-200 cursor-not-allowed",
};

const sizeClasses = {
  small: "text-sm h-10",
  medium: "h-12",
  big: "h-14",
};

const Input = React.forwardRef(
  (
    {
      id,
      className,
      label,
      note,
      name,
      error,
      children,
      variant = "normal",
      dimension = "medium",
      shadow = false,
      type = "text",
      inputClassName,
      readOnly = false,
      ...rest
    },
    ref
  ) => {
    const rootClassName = cn(
      classes.root,
      {
        [classes.normal]: variant === "normal",
        [classes.solid]: variant === "solid",
        [classes.outline]: variant === "outline",
      },
      {
        [classes.shadow]: shadow,
      },
      {
        [classes.readOnly]: readOnly,
      },
      sizeClasses[dimension],
      inputClassName
    );

    if (type === "radio") {
      return (
        <div className={className}>
          <div className="flex items-center">
            <input
              id={id}
              name={name}
              type="radio"
              ref={ref}
              className={styles.radio_input}
              {...rest}
            />

            <label htmlFor={id} className="text-body text-sm">
              {label}
            </label>
          </div>

          {error && (
            <p className="my-2 text-xs text-end text-red-500">{error}</p>
          )}
        </div>
      );
    }

    if (readOnly) {
      return (
        <div className={className}>
          <label
            htmlFor={name}
            className="block text-body-dark font-semibold text-sm leading-none mb-3"
          >
            {label}
          </label>
          <input
            id={name}
            name={name}
            type={type}
            ref={ref}
            className={rootClassName}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            readOnly
            {...rest}
          />
        </div>
      );
    }

    return (
      <div className={className}>
        <label
          htmlFor={name}
          className="block text-body-dark font-semibold text-sm leading-none mb-3"
        >
          {label}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          className={rootClassName}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-invalid={error ? "true" : "false"}
          {...rest}
        />
        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

export default Input;
