import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { ROUTES } from "../utils/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import Button from "../ui/button";
import Alert from "../ui/alert";
import Input from "../ui/input";
import { useRecoilState, useRecoilValue } from "recoil";
import { reservationAtom, reservationStateValue } from "../store/app-store";
import useFormatedDateTime from "../../lib/hooks/useFormatedTime";

const AmountForm = ({ defaultValues }) => {
  const [amount, setAmount] = useState(defaultValues.amount);
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

  function onSubmit(event) {
    event.preventDefault();
    if(amount !== 0){
      const amountEnteredTime = new Date().toGMTString();
      setReservationState((prev) => {
        const savedValues = JSON.parse(JSON.stringify(prev));
        savedValues.amount = amount;
        savedValues.amount_enter_time = amountEnteredTime;
        savedValues.current_path =  ROUTES.NOTE;
        return savedValues;
      });
      if (errorMsg) setErrorMsg("");
      navigate(ROUTES.NOTE);
    }
    setErrorMsg("Please enter a valid amount")
  }

  return (
    <>
      <form>
        {errorMsg ? (
          <Alert
            message={errorMsg}
            variant="error"
            closeable={true}
            className="mt-5"
            onClose={() => setErrorMsg("")}
          />
        ) : null}
        <div className="mb-5">
          <Input
            label={"Amount (BDT) *"}
            type="number"
            name="amount"
            variant="outline"
            onValueChange={(values)=>setAmount(values.floatValue)}
            value={amount}
          />
        </div>

        <div className="flex justify-between items-center ">
          <Button
            className="w-fit !bg-gray-500 !text-light hover:!bg-gray-600"
            disabled={false}
            type="button"
            onClick={goBack}
          >
            Back
          </Button>
          <Button
            className="w-fit px-8"
            disabled={false}
            onClick={onSubmit}
            type="button"
          >
            Next
          </Button>
        </div>
      </form>
    </>
  );
};

function AmountPage() {
  const {
    amount,
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
      <AmountForm defaultValues={{ amount }} />
    </div>
  );
}

export default AmountPage;
