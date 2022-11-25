import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { ROUTES } from "../utils/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import Button from "../ui/button";
import Alert from "../ui/alert";
import Input from "../ui/input";
import Label from "../ui/label";
import CITIES from "../config/locations.json";
import SelectInput from "../ui/select/select-input";
import { useRecoilState, useRecoilValue } from "recoil";
import { reservationAtom, reservationStateValue } from "../store/app-store";
import useFormatedDateTime from "../../lib/hooks/useFormatedTime";

const tofromFormSchema = yup.object().shape({
  from: yup
    .object()
    .shape({
      id: yup.number().required("You must select a city as From"),
      ja: yup.string().nullable(),
      en: yup.string().nullable(),
    }),
  to: yup
    .object()
    .shape({
      id: yup.number().required("You must select a city as To"),
      ja: yup.string().nullable(),
      en: yup.string().nullable(),
    }),
});
const defaultValues = null;

const FromToForm = () => {
  const [_, setReservationState] = useRecoilState(reservationAtom);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(tofromFormSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  function goBack() {
    setReservationState((prev) => {
      const savedValues = JSON.parse(JSON.stringify(prev));
      savedValues.current_path = ROUTES.PERSONALINFO;
      return savedValues;
    });
    navigate(-1);
  }

  function onSubmit({ from, to }) {
    if (from.id === to.id) {
      setErrorMsg("From & To location can't be same.");
      return;
    }
    const fromToEnteredTime = new Date().toGMTString();
    setReservationState((prev) => {
      const savedValues = JSON.parse(JSON.stringify(prev));
      savedValues.location_from = from.id;
      savedValues.location_to = to.id;
      savedValues.from_to_enter_time = fromToEnteredTime;
      savedValues.current_path = ROUTES.DATETIME;
      return savedValues;
    });

    if (errorMsg) setErrorMsg("");
    navigate(ROUTES.DATETIME);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-5">
          <Label>{"From"}</Label>
          <SelectInput
            name="from"
            control={control}
            getOptionLabel={(option) => option.ja}
            getOptionValue={(option) => option.id}
            options={CITIES}
          />
          {errors?.from?.id?.message ? (
            <p className="my-2 text-xs text-red-500">
              {errors?.from?.id?.message}
            </p>
          ) : null}
        </div>
        <div className="mb-5">
          <Label>{"To"}</Label>
          <SelectInput
            name="to"
            control={control}
            getOptionLabel={(option) => option.ja}
            getOptionValue={(option) => option.id}
            options={CITIES}
          />
          {errors?.to?.id?.message ? (
            <p className="my-2 text-xs text-red-500">
              {errors?.to?.id?.message}
            </p>
          ) : null}
        </div>
        {errorMsg ? (
          <div className="mb-5">
            <Alert
              message={errorMsg}
              variant="error"
              closeable={true}
              className="mt-5"
              onClose={() => setErrorMsg("")}
            />
          </div>
        ) : null}
        <div className="flex justify-between items-center ">
          <Button
            className="w-fit !bg-gray-500 !text-light hover:!bg-gray-600"
            disabled={false}
            type="button"
            onClick={goBack}
          >
            Back
          </Button>
          <Button className="w-fit px-8" disabled={false} type="submit">
            Next
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

function FromToPage() {
  const { personal_information_enter_time, login_time } = useRecoilValue(
    reservationStateValue
  );
  const loginTime = useFormatedDateTime({
    time: login_time,
    timeZone: "JST",
  });

  const personalInfoEnteredTime = useFormatedDateTime({
    time: personal_information_enter_time,
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
      <Input
        label={"Personal Information Enter Time"}
        defaultValue={personalInfoEnteredTime}
        type="text"
        variant="outline"
        className="mb-4"
        readOnly={true}
      />
      <FromToForm />
    </div>
  );
}

export default FromToPage;
