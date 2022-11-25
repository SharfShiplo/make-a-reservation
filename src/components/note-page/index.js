import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ROUTES } from "../utils/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import Button from "../ui/button";
import Alert from "../ui/alert";
import Input from "../ui/input";
import { defaultNote } from "../config/note";
import TextArea from "../ui/text-area";
import { useRecoilState, useRecoilValue } from "recoil";
import { reservationAtom, reservationStateValue } from "../store/app-store";
import useFormatedDateTime from "../../lib/hooks/useFormatedTime";

const defaultValues = {
  note: defaultNote,
};

const NoteForm = ({ initialValue }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue,
  });
  const [_, setReservationState] = useRecoilState(reservationAtom);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  function goBack() {
    setReservationState((prev) => {
      const savedValues = JSON.parse(JSON.stringify(prev));
      savedValues.current_path = ROUTES.PAYMENT;
      return savedValues;
    });
    navigate(-1);
  }

  function onSubmit({ note }) {
    const noteEnteredTime = new Date().toGMTString();
    setReservationState((prev) => {
      const savedValues = JSON.parse(JSON.stringify(prev));
      if (note) savedValues.note = note;
      savedValues.note_enter_time = noteEnteredTime;
      savedValues.current_path = ROUTES.FINAL_CONFIRMATION;
      return savedValues;
    });
    if (errorMsg) setErrorMsg("");
    navigate(ROUTES.FINAL_CONFIRMATION);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextArea
          label={"Note *"}
          {...register("note")}
          variant="outline"
          className="mb-5"
        />
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

function NotePage() {
  const {
    note,
    amount_enter_time,
    date_time_enter_time,
    from_to_enter_time,
    personal_information_enter_time,
    login_time,
  } = useRecoilValue(reservationStateValue);
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
  const dateTimeEnteredTime = useFormatedDateTime({
    time: date_time_enter_time,
    timeZone: "JST",
  });
  const amountEnteredTime = useFormatedDateTime({
    time: amount_enter_time,
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
      <Input
        label={"Date Time Enter Time"}
        defaultValue={dateTimeEnteredTime}
        type="text"
        variant="outline"
        className="mb-4"
        readOnly={true}
      />
      <Input
        label={"Amount Time"}
        defaultValue={amountEnteredTime}
        type="text"
        variant="outline"
        className="mb-4"
        readOnly={true}
      />
      <NoteForm initialValue={{ note }} />
    </div>
  );
}

export default NotePage;
