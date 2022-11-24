import cn from "classnames";
import React from "react";

const classes = {
  root: "py-3 px-4 w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0",
  normal:
    "bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent",
  solid:
    "bg-gray-100 border border-border-100 focus:bg-light focus:border-accent",
  outline: "border border-border-base focus:border-accent",
  shadow: "focus:shadow",
  readOnly: "bg-gray-200 cursor-not-allowed",
};

const TextArea = React.forwardRef((props, ref) => {
  const {
    className,
    label,
    name,
    error,
    variant = "normal",
    shadow = false,
    inputClassName,
    ...rest
  } = props;

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
        [classes.readOnly]: props.readOnly,
    },
    inputClassName
  );

  return (
    <div className={className}>
      {label && (
        <label className="block text-body-dark font-semibold text-sm leading-none mb-3">
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        className={rootClassName}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        rows={8}
        ref={ref}
        {...rest}
      />
      {error && <p className="my-2 text-xs text-end text-red-500">{error}</p>}
    </div>
  );
});

export default TextArea;
