import React, { useState } from "react";
import { ROUTES } from "../utils/routes";
import { useNavigate } from "react-router";
import Button from "../ui/button";
import Alert from "../ui/alert";
import { defaultNote } from "../config/note";
import TextArea from "../ui/text-area";
import Label from "../ui/label";

const LabeledInformation = ({ label, info }) => {
  return (
    <Label className="!mb-5">
      <span>{label}</span>&nbsp;&nbsp;
      <span className="text-gray-500">{info}</span>
    </Label>
  );
};

export const ReservationDetails = ({ reservationData }) => {
  return (
    <div className="w-full h-fit">
      {/* Locale Buttons */}
      <div className="flex justify-end items-center">
        <div className="grid grid-cols-2 divide-x divide-gray-200 divide-x-1 shadow">
          <Button
            className="w-full !bg-transparent text-heading text-gray-600 !p-2.5 !rounded-none focus:!ring-none focus:!ring-transparent"
            disabled={false}
            type="button"
            onClick={() => {}}
            size="small"
          >
            BD
          </Button>
          <Button
            className="w-full !bg-transparent text-heading text-gray-600 !p-2.5 border-y-0 !rounded-none focus:!ring-none focus:!ring-transparent"
            disabled={false}
            type="button"
            size="small"
          >
            JP
          </Button>
        </div>
      </div>
      {/* Reservations Details */}
      <div className="w-full mt-4">
        <LabeledInformation
          label={"Login time:"}
          info={"Wednesday, November 23, 2022 (GMT+6)"}
        />
        <LabeledInformation
          label={"Personal Information enter time:"}
          info={"Wednesday, November 23, 2022 (GMT+6)"}
        />
        <LabeledInformation
          label={"From To enter time:"}
          info={"Wednesday, November 23, 2022 (GMT+6)"}
        />
        <LabeledInformation
          label={"Date Time enter time:"}
          info={"Wednesday, November 23, 2022 (GMT+6)"}
        />
        <LabeledInformation
          label={"Amount enter time:"}
          info={"Wednesday, November 23, 2022 (GMT+6)"}
        />
        <LabeledInformation
          label={"Note enter time:"}
          info={"Wednesday, November 23, 2022 (GMT+6)"}
        />
        <LabeledInformation
          label={"Name:"}
          info={"Wednesday, November 23, 2022 (GMT+6)"}
        />
        <LabeledInformation
          label={"Gender:"}
          info={"Wednesday, November 23, 2022 (GMT+6)"}
        />
        <LabeledInformation
          label={"From:"}
          info={"Wednesday, November 23, 2022 (GMT+6)"}
        />
        <LabeledInformation
          label={"To:"}
          info={"Wednesday, November 23, 2022 (GMT+6)"}
        />
        <LabeledInformation
          label={"Date:"}
          info={"Wednesday, November 23, 2022 (GMT+6)"}
        />
        <LabeledInformation
          label={"Time:"}
          info={"Wednesday, November 23, 2022 (GMT+6)"}
        />
        <LabeledInformation
          label={"Amount:"}
          info={"Wednesday, November 23, 2022 (GMT+6)"}
        />
        <TextArea
          label={"Note"}
          variant="outline"
          className="mb-5"
          readOnly
          defaultValue={defaultNote}
        />
      </div>
    </div>
  );
};

function FinalConfirmationPage() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div className="w-full max-w-[692px] h-fit">
      <ReservationDetails data={null} />
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
