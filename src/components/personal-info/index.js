import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ROUTES } from "../utils/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import Button from "../ui/button";
import Alert from "../ui/alert";
import Input from "../ui/input";
import Label from "../ui/label";
import GENDER from "../config/gender.json"
import { reservationStateValue } from "../store/app-store";
import { useRecoilValue } from "recoil";
const personalInfoFormSchema = yup.object().shape({
  name: yup
    .string()
    .required("You must need to provide your name"),
});
const defaultValues = {
  name: "",
};

const PersonalInfoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(personalInfoFormSchema),
  });
  
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  function onSubmit({ name, gender }) {
    const input = {name}
    if(gender) input.gender = gender;
    console.log(input)
    navigate(ROUTES.TOFROM)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={"Name *"}
          {...register("name")}
          type="text"
          variant="outline"
          className="mb-4"
          error={errors?.name?.message}
        />
        <div className='mb-2'>
              <Label>{"Gender"}</Label>
              <div className="space-x-4 flex items-center">
                <Input
                  id={GENDER[0].id}
                  {...register("gender")}
                  type="radio"
                  value={GENDER[0].en}
                  label={GENDER[0].en}
                />
                <Input
                  id={GENDER[1].id}
                  {...register("gender")}
                  type="radio"
                  value={GENDER[1].en}
                  label={GENDER[1].en}
                />
              </div>
            </div>
        <div className="flex justify-end ">
        <Button className="w-fit px-8" disabled={false}>
          Next
        </Button>
        </div>
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

function PersonalInformationPage() {
  const reservationState = useRecoilValue(reservationStateValue);
  return (
    <div className="w-full max-w-[692px] h-fit">
        <Input
          label={"Login Time"}
          defaultValue={reservationState.login_time}
          type="text"
          variant="outline"
          className="mb-4"
          readOnly={true}
        />
      <PersonalInfoForm/>
    </div>
  );
}

export default PersonalInformationPage;
