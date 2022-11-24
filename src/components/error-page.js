import React from "react";
import { useNavigate } from "react-router";
import Button from "./ui/button";

function ErrorPage() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }
  return (
    <div className="w-full max-w-[692px] text-center h-fit">
      <h2 className="text-3xl font-semibold text-orange-500 mb-5">
        This name already exists.
      </h2>
      <div className="w-full flex justify-center items-center">
        <Button
          className="w-fit !bg-gray-500 !text-light hover:!bg-gray-600"
          disabled={false}
          type="button"
          onClick={goBack}
        >
          Back
        </Button>
      </div>
    </div>
  );
}

export default ErrorPage;
