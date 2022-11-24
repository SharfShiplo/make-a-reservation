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

const defaultValues = {
  note: defaultNote,
};

const NoteForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  function onSubmit({ note }) {
    // console.log(note);
    navigate(ROUTES.FINAL_CONFIRMATION);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextArea
            label={'Note *'}
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
  return (
    <div className="w-full max-w-[692px] h-fit">
      <Input
        label={"Login Time"}
        defaultValue={"Wednesday, November 23, 2022 (GMT+6)"}
        type="text"
        variant="outline"
        className="mb-4"
        readOnly={true}
      />
      <Input
        label={"Personal Information Enter Time"}
        defaultValue={"Wednesday, November 23, 2022 (GMT+6)"}
        type="text"
        variant="outline"
        className="mb-4"
        readOnly={true}
      />
      <Input
        label={"From To Enter Time"}
        defaultValue={"Wednesday, November 23, 2022 (GMT+6)"}
        type="text"
        variant="outline"
        className="mb-4"
        readOnly={true}
      />
      <Input
        label={"Date Time Enter Time"}
        defaultValue={"Wednesday, November 23, 2022 (GMT+6)"}
        type="text"
        variant="outline"
        className="mb-4"
        readOnly={true}
      />
      <Input
        label={"Amount Time"}
        defaultValue={"Wednesday, November 23, 2022 (GMT+6)"}
        type="text"
        variant="outline"
        className="mb-4"
        readOnly={true}
      />
      <NoteForm />
    </div>
  );
}

export default NotePage;
