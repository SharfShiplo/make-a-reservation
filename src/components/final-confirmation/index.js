import React, { useMemo, useState } from "react";
import { ROUTES } from "../utils/routes";
import { useNavigate } from "react-router";
import Button from "../ui/button";
import Alert from "../ui/alert";
import TextArea from "../ui/text-area";
import Label from "../ui/label";
import { useRecoilState, useRecoilValue } from "recoil";
import { reservationAtom, reservationStateValue } from "../store/app-store";
import useFormatedDateTime from "../../lib/hooks/useFormatedTime";
import CITIES from "../config/locations.json";
import GENDER from "../config/gender.json";
import { FormattedMessage, useIntl } from "react-intl";
import useFormatedAmount, { CURRENCY } from "../../lib/hooks/useFormateAmount";
import { LOCALES } from "../../i18n/constants";

const LabeledInformation = ({ label, info, id = null }) => {
  if (id) {
    return (
      <Label className="!mb-5">
        <FormattedMessage id={id}>
          {(txt) => <span>{txt}</span>}
        </FormattedMessage>
        &nbsp;&nbsp;
        <span className="text-gray-500">{info}</span>
      </Label>
    );
  }
  return (
    <Label className="!mb-5">
      <span>{label}</span>
      &nbsp;&nbsp;
      <span className="text-gray-500">{info}</span>
    </Label>
  );
};

export const ReservationDetails = ({ data }) => {
  const {
    name,
    gender,
    login_time,
    location_from,
    location_to,
    personal_information_enter_time,
    from_to_enter_time,
    date_time_enter_time,
    amount_enter_time,
    note_enter_time,
    reservation_date,
    reservation_time,
    locale,
    amount,
    note,
  } = data;
  const [_, setReservationState] = useRecoilState(reservationAtom);

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
  const noteEnteredTime = useFormatedDateTime({
    time: note_enter_time,
    timeZone: "JST",
  });

  const amountValue = useFormatedAmount({
    currency: CURRENCY.JAPAN,
    value: amount,
    exchangeRate: 1.47,
  });

  function switchLocale(locale) {
    setReservationState((prev) => {
      const savedValues = JSON.parse(JSON.stringify(prev));
      savedValues.locale = locale;
      return savedValues;
    });
  }

  return (
    <div className="w-full h-fit">
      {/* Locale Buttons */}
      <div className="flex justify-end items-center">
        <div className="grid grid-cols-2 divide-x divide-gray-200 divide-x-1 shadow rounded">
          <Button
            className="w-full !bg-transparent text-heading !text-gray-600 !p-2.5 !rounded-none focus:!ring-none focus:!ring-transparent"
            disabled={locale === LOCALES.ENGLISH}
            type="button"
            onClick={() => switchLocale(LOCALES.ENGLISH)}
            size="small"
          >
            BD
          </Button>
          <Button
            className="w-full !bg-transparent text-heading !text-gray-600 !p-2.5 border-y-0 !rounded-none focus:!ring-none focus:!ring-transparent"
            disabled={locale === LOCALES.JAPANESE}
            type="button"
            size="small"
            onClick={() => switchLocale(LOCALES.JAPANESE)}
          >
            JP
          </Button>
        </div>
      </div>
      {/* Reservations Details */}
      <div className="w-full mt-4">
        <LabeledInformation id={"login_time"} info={loginTime} />
        <LabeledInformation
          id={"personal_time"}
          info={personalInfoEnteredTime}
        />
        <LabeledInformation id={"from_time"} info={fromToEnteredTime} />
        <LabeledInformation id={"date_time"} info={dateTimeEnteredTime} />
        <LabeledInformation id={"amount_time"} info={amountEnteredTime} />
        <LabeledInformation id={"note_time"} info={noteEnteredTime} />
        <LabeledInformation label={"Name:"} info={name} />
        <LabeledInformation
          id={"gender"}
          info={GENDER.find((item) => item.id == gender).en}
        />
        <LabeledInformation
          id={"from"}
          info={CITIES.find((city) => city.id === location_from).en}
        />
        <LabeledInformation
          id={"to"}
          info={CITIES.find((city) => city.id === location_to).en}
        />
        <LabeledInformation
          id={"date"}
          info={new Date(reservation_date).toLocaleString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        />
        <LabeledInformation
          id={"time"}
          info={new Date(reservation_time).toLocaleTimeString("en-US", {
            hour12: false,
          })}
        />
        <LabeledInformation id={"amount"} info={amountValue} />
        <TextArea
          label={"Note"}
          variant="outline"
          className="mb-5"
          readOnly
          defaultValue={note}
        />
      </div>
    </div>
  );
};

function FinalConfirmationPage() {
  const navigate = useNavigate();
  const reservationState = useRecoilValue(reservationStateValue);
  const [reservationData, setReservationState] =
    useRecoilState(reservationAtom);

  function goBack() {
    setReservationState((prev) => {
      const savedValues = JSON.parse(JSON.stringify(prev));
      savedValues.current_path = ROUTES.NOTE;
      return savedValues;
    });
    navigate(-1);
  }

  return (
    <div className="w-full max-w-[692px] h-fit">
      <ReservationDetails data={reservationState} />
      <div className="flex justify-between items-center ">
        <Button
          className="w-fit !bg-gray-500 !text-light hover:!bg-gray-600"
          disabled={false}
          type="button"
          onClick={goBack}
        >
          Back
        </Button>
        <Button className="w-fit px-8" disabled={false} type="button">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default FinalConfirmationPage;
