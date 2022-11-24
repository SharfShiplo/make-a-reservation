import React from "react";
import { useNavigate } from "react-router";
import Button from "./ui/button";

function ThankYouPage() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }
  return (
    <div className="w-full max-w-[692px] h-fit">
      <h2 className="text-3xl font-semibold text-accent mb-5">Thank you!</h2>
      <h2 className="text-3xl font-semibold text-gray-600 mb-5">
        Your Reservation Id is : 1234567890
      </h2>
      <div className="w-full flex gap-2.5 items-center">
        <Button
          className="w-fit !bg-gray-500 !text-light hover:!bg-gray-600"
          disabled={false}
          type="button"
          onClick={goBack}
        >
          Back
        </Button>
        <Button className="w-fit px-8" disabled={false} type="button">
          Restart
        </Button>
      </div>
    </div>
  );
}

export default ThankYouPage;
