import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import AmountPage from "../amount-page";
import LoginView from "../auth/login-form";
import DateTimePage from "../date-time-page";
import ErrorPage from "../error-page";
import FinalConfirmationPage from "../final-confirmation";
import FromToPage from "../from-to-page/from-to-page";
import NotFoundPage from "../not-found-page";
import NotePage from "../note-page";
import PersonalInformationPage from "../personal-info";
import { reservationStateValue } from "../store/app-store";
import ThankYouPage from "../thank-you-page";
import HomePage from "../top-page";
import { ROUTES } from "../utils/routes";

const PrivateRoute = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path={ROUTES.PERSONALINFO} exact element={<PersonalInformationPage/>} />
      <Route path={ROUTES.TOFROM} exact element={<FromToPage/>} />
      <Route path={ROUTES.DATETIME} exact element={<DateTimePage/>} />
      <Route path={ROUTES.PAYMENT} exact element={<AmountPage/>} />
      <Route path={ROUTES.NOTE} exact element={<NotePage/>} />
      <Route path={ROUTES.FINAL_CONFIRMATION} exact element={<FinalConfirmationPage/>} />
      <Route path={ROUTES.ERROR} exact element={<ErrorPage />} />
      <Route path={ROUTES.THANKYOU} exact element={<ThankYouPage/>} />
      <Route path={ROUTES.RESERVATIONCHECK} element={<h2>Reservation details page</h2>} />
      <Route path="*" exact element={<NotFoundPage/>} />
    </Routes>
  );
};

const RouterGuard = ({ children }) => {
  const { authorized_user } = useRecoilValue(reservationStateValue);

  const isAuthorized = authorized_user;
  return isAuthorized ? (
    <PrivateRoute>{children}</PrivateRoute>
  ) : (
    <Navigate replace to={ROUTES.LOGIN} />
  );
};


function AllPages() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginView />} exact />
      <Route path="/*" element={<RouterGuard />} />
    </Routes>
  );
}

export default AllPages;
