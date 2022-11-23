
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { useEffect } from "react";

  export const Form = ({
    onSubmit,
    children,
    options,
    validationSchema,
    serverError,
    resetValues,
    ...props
  }) => {
    
    const methods = useForm({
      ...(!!validationSchema && { resolver: yupResolver(validationSchema) }),
      ...(!!options && options),
    });

    useEffect(() => {
      if (serverError) {
        Object.entries(serverError).forEach(([key, value]) => {
          methods.setError(key, {
            type: "manual",
            message: value,
          });
        });
      }
    }, [serverError, methods]);
  
    useEffect(() => {
      if (resetValues) {
        methods.reset(resetValues);
      }
    }, [resetValues, methods]);
    
    return (
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate {...props}>
        {children(methods)}
      </form>
    );
  };
  