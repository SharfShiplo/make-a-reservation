import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginView from "../auth/login-form";
import FromToPage from "../from-to-page/from-to-page";
import PersonalInformationPage from "../personal-info";
import HomePage from "../top-page";
import { ROUTES } from "../utils/routes";

const PrivateRoute = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path={ROUTES.PERSONALINFO} exact element={<PersonalInformationPage/>} />
      <Route path={ROUTES.TOFROM} exact element={<FromToPage/>} />
      <Route path={ROUTES.DATETIME} exact element={<h2>Date Time Selection Page </h2>} />
      <Route path={ROUTES.PAYMENT} exact element={<h2>Payment Confirmation Selection Page </h2>} />
      <Route path={ROUTES.NOTE} exact element={<h2>Note Selection Page </h2>} />
      <Route path={ROUTES.FINALCONFIRMATION} exact element={<h2>Final Confirmation Page </h2>} />
      <Route path={ROUTES.ERROR} exact element={<h2>Error Page </h2>} />
      <Route path={ROUTES.THANKYOU} exact element={<h2>Thank You Page </h2>} />
      <Route path={ROUTES.RESERVATIONCHECK} element={<h2>Reservation details page</h2>} />
      <Route path="*" exact element={<h2>Page not found</h2>} />
    </Routes>
  );
};

const RouterGuard = ({ children }) => {
  const isAuthorized = true;
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
