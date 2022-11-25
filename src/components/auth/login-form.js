import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ROUTES } from "../utils/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../ui/input";
import Button from "../ui/button";
import Alert from "../ui/alert";
import { useRecoilState } from "recoil";
import { reservationAtom } from "../store/app-store";
import { FormattedMessage } from "react-intl";

const loginFormSchema = yup.object().shape({
  id: yup.string().required("You must need to provide your id"),
  password: yup.string().required("You must need to provide your password"),
});
const defaultValues = {
  id: "",
  password: "",
};

const LoginForm = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [_, setReservationState] = useRecoilState(reservationAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(loginFormSchema),
  });

  const navigate = useNavigate();

  function onSubmit({ id, password }) {
    const loginTime = new Date().toGMTString();
    if (id === "badaccount" && password === "badpassword") {
      setErrorMsg(
        "Login failed, Please check your id & password, then try again!"
      );
      return;
    }
    setReservationState((prev) => {
      const savedValues = JSON.parse(JSON.stringify(prev));
      savedValues.authorized_user = true;
      savedValues.login_time = loginTime
      savedValues.current_path = ROUTES.HOME
      return savedValues;
    })
    navigate(ROUTES.HOME);
  }

  return (
    <>
      {errorMsg ? (
        <Alert
          message={errorMsg}
          variant="error"
          closeable={true}
          className="mb-5"
          onClose={() => setErrorMsg("")}
        />
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={"Id *"}
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
        <div className="flex justify-center items-center ">

        <Button className="w-fit !px-10" disabled={false}>
          Login
        </Button>
        </div>
      </form>
    </>
  );
};

const LoginView = () => (
  <div className="w-full max-w-[692px] h-fit">
    <FormattedMessage id="hello" >
      {txt=><h2>{txt}</h2>}
    </FormattedMessage>
    <LoginForm />
  </div>
);

export default LoginView;
