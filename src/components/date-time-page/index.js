import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { ROUTES } from "../utils/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import Button from "../ui/button";
import Alert from "../ui/alert";
import Input from "../ui/input";
import Label from "../ui/label";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { reservationAtom, reservationStateValue } from "../store/app-store";
import useFormatedDateTime from "../../lib/hooks/useFormatedTime";
import { LOCALES } from "../../i18n/constants";

const defaultValues = {
  date: new Date(),
  time: new Date().getTime(),
};

const DateTimeForm = () => {
  const [_, setReservationState] = useRecoilState(reservationAtom);
  const {
    handleSubmit,
    control,
  } = useForm({
    defaultValues,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  function goBack() {
    setReservationState((prev) => {
      const savedValues = JSON.parse(JSON.stringify(prev));
      savedValues.current_path = ROUTES.TOFROM;
      return savedValues;
    });
    navigate(-1);
  }
  const isValidTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getHours() >= selectedDate.getHours();
  };

  const isCurrentDate = (date) => {
    const currentDate = new Date().toLocaleDateString(LOCALES.ENGLISH);
    const selectedDate = new Date(date).toLocaleDateString(LOCALES.ENGLISH);
    return currentDate === selectedDate;
  };

  function onSubmit({ date, time }) {
    if (isCurrentDate(date)) {
      if (isValidTime(time)) {
        setErrorMsg(
          "You must select atleast one hour ahead from the current time."
        );
        return;
      }
    }
    const DateTimeEnteredTime = new Date().toGMTString();
    setReservationState((prev) => {
      const savedValues = JSON.parse(JSON.stringify(prev));
      savedValues.reservation_date = date;
      savedValues.reservation_time = time;
      savedValues.date_time_enter_time = DateTimeEnteredTime;
      savedValues.current_path = ROUTES.PAYMENT;
      return savedValues;
    });
    if (errorMsg) setErrorMsg("");
    navigate(ROUTES.PAYMENT);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-5">
          <Label>{"Date"}</Label>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, onBlur, value } }) => (
              <ReactDatePicker
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                minDate={new Date()}
                locale={LOCALES.ENGLISH}
              />
            )}
          />
        </div>
        <div className="mb-5">
          <Label>{"Time"}</Label>
          <Controller
            control={control}
            name="time"
            render={({ field: { onChange, onBlur, value } }) => (
              <ReactDatePicker
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="HH:mm"
                timeFormat="HH:mm"
                locale={LOCALES.ENGLISH}
              />
            )}
          />
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
    </>
  );
};

function DateTimePage() {
  const { from_to_enter_time, personal_information_enter_time, login_time } =
    useRecoilValue(reservationStateValue);
  const loginTime = useFormatedDateTime({
    time: login_time,
    timeZone: "JST",
  });

  const personalInfoEnteredTime = useFormatedDateTime({
    time: personal_information_enter_time,
    timeZone: "JST",
  });

  const fromToEnteredTime = useFormatedDateTime({
    time: from_to_enter_time,
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
      <Input
        label={"From To Enter Time"}
        defaultValue={fromToEnteredTime}
        type="text"
        variant="outline"
        className="mb-4"
        readOnly={true}
      />
      <DateTimeForm />
    </div>
  );
}

export default DateTimePage;
