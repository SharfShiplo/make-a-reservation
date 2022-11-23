import { Controller } from "react-hook-form";
import Select from "./select";

const SelectInput = ({
  control,
  options,
  name,
  rules,
  getOptionLabel,
  getOptionValue,
  isMulti,
  isClearable,
  isLoading,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      {...rest}
      render={({ field }) => (
        <Select
          {...field}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          isMulti={isMulti}
          isClearable={isClearable}
          isLoading={isLoading}
          options={options}
        />
      )}
    />
  );
};

export default SelectInput;
