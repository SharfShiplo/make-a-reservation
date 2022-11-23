
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ROUTES } from "../utils/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../ui/input";
import Button from "../ui/button";
import Alert from "../ui/alert";

const loginFormSchema = yup.object().shape({
  id: yup
    .string().required("You must need to provide your id"),
  password: yup.string().required("You must need to provide your password"),
});
const defaultValues = {
  id: "",
  password: "",
};

const LoginForm = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(loginFormSchema),
  });
  const navigate = useNavigate();

  console.log("rendering login view")

  function onSubmit({ id, password }) {
    console.log(id, password);
    // will be in future;
    // login(
    //   {
    //     variables: {
    //       id,
    //       password,
    //     },
    //   },
    //   {
    //     onSuccess: ({ data }) => {
    //       if (data?.token) {
            
    //         navigate(ROUTES.HOME);
    //         // we need to save the token to the store,
    //         setErrorMsg("");
    //       } else {
    //         setErrorMsg("The credentials was wrong!");
    //       }
    //     },
    //     onError: () => {},
    //   }
    // );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={'Id *'}
          {...register("id")}
          type="text"
          variant="outline"
          className="mb-4"
          error={errors?.id?.message}
        />
        <Input
          label={"Password *"}
          {...register("password")}
          type="password"
          error={errors?.password?.message}
          variant="outline"
          className="mb-4"
        />
        {/* loading will be passed with the api implementation */}
        <Button className="w-full"  disabled={false}>
          Login
        </Button>

        {errorMsg ? (
          <Alert
            message={errorMsg}
            variant="error"
            closeable={true}
            className="mt-5"
            onClose={() => setErrorMsg("")}
          />
        ) : null}
      </form>
    </>
  );
};

const LoginView =()=>(
    <div className="w-full max-w-[692px] h-fit">
        <LoginForm/>
    </div>
);

export default LoginView;
