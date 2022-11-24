import React, { useState } from "react";
import LinkButton from "../ui/link-button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ROUTES } from "../utils/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import Button from "../ui/button";
import Alert from "../ui/alert";
import Input from "../ui/input";
import { reservationAtom } from "../store/app-store";
import { useRecoilState } from "recoil";

const reservationFormSchema = yup.object().shape({
  reservationId: yup
    .string()
    .required("You must need to provide your reservationId"),
});
const defaultValues = {
  reservationId: "",
};

const ReservationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(reservationFormSchema),
  });

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  function onSubmit({ reservationId }) {
    navigate(`${ROUTES.RESERVATION}/${reservationId}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={"Reservation Id *"}
          {...register("reservationId")}
          type="text"
          variant="outline"
          className="mb-4"
          error={errors?.reservationId?.message}
        />
        <div className="flex justify-end ">
          <Button className="w-fit px-8" disabled={false}>
            Search
          </Button>
        </div>
        {/* <Button className="w-full"  disabled={false} size={"medium"}>
          Search
        </Button> */}
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

function HomePage() {
  const [_, setReservationState] = useRecoilState(reservationAtom);
function updateCurrentPath (){
  setReservationState((prev) => {
    const savedValues = JSON.parse(JSON.stringify(prev));
    savedValues.current_path = ROUTES.PERSONALINFO
    return savedValues;
  })
}
  return (
    <div className="w-full max-w-[692px] h-fit">
      <div className="flex justify-center">
        <button className='bg-tranparent w-max h-max' onClick={updateCurrentPath}>
          <LinkButton
            href={ROUTES.PERSONALINFO}
            className="h-11 w-full !bg-gray-500 !text-light hover:!bg-gray-600 sm:h-12"
            size="medium"
          >
            Make a new reservation
          </LinkButton>
        </button>
      </div>
      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
        <hr className="w-full" />
        <span className="absolute start-2/4 -top-2.5 px-2 -ms-4 bg-light">
          Or
        </span>
      </div>
      <ReservationForm />
    </div>
  );
}

export default HomePage;
