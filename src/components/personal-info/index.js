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
import GENDER from "../config/gender.json";
import { reservationAtom, reservationStateValue } from "../store/app-store";
import { useRecoilState, useRecoilValue } from "recoil";
import useFormatedDateTime from "../../lib/hooks/useFormatedTime";
const personalInfoFormSchema = yup.object().shape({
  name: yup.string().required("You must need to provide your name"),
});

const PersonalInfoForm = ({ defaultValues }) => {
  const [_, setReservationState] = useRecoilState(reservationAtom);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(personalInfoFormSchema),
  });

  function onSubmit({ name, gender }) {
    const personalInfoEnteredTime = new Date().toGMTString();
    setReservationState((prev) => {
      const savedValues = JSON.parse(JSON.stringify(prev));
      savedValues.name = name;
      if (gender) savedValues.gender = gender;
      savedValues.personal_information_enter_time = personalInfoEnteredTime;
      savedValues.current_path = ROUTES.TOFROM;
      return savedValues;
    });
    navigate(ROUTES.TOFROM);
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
        <div className="mb-2">
          <Label>{"Gender"}</Label>
          <div className="space-x-4 flex items-center">
            <Input
              id={GENDER[0].id}
              {...register("gender")}
              type="radio"
              value={GENDER[0].id}
              label={GENDER[0].en}
            />
            <Input
              id={GENDER[1].id}
              {...register("gender")}
              type="radio"
              value={GENDER[1].id}
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
  const { name, gender, login_time } = useRecoilValue(reservationStateValue);
  const loginTime = useFormatedDateTime({
    time: login_time,
    timeZone: "JST",
  });

  return (
    <div className="w-full max-w-[692px] h-fit">
      <Input
        label={"Login Time"}
        defaultValue={loginTime}
        type="text"
        variant="outline"
        className="mb-4"
        readOnly={true}
      />
      <PersonalInfoForm defaultValues={{ name, gender }} />
    </div>
  );
}

export default PersonalInformationPage;
