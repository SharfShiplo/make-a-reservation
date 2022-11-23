import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const PrivateRoute = () => {
  return (
    <Routes>
      <Route index element={<h2>Top page or home page</h2>} />
      <Route path="/personal-information" exact element={<h2>Personal information Page </h2>} />
      <Route path="/to-from-selection" exact element={<h2>To From Selection Page </h2>} />
      <Route path="/date-time-selection" exact element={<h2>Date Time Selection Page </h2>} />
      <Route path="/payment-confirmation" exact element={<h2>Payment Confirmation Selection Page </h2>} />
      <Route path="/additional-note" exact element={<h2>Note Selection Page </h2>} />
      <Route path="/final-confirmation" exact element={<h2>Final Confirmation Page </h2>} />
      <Route path="/error" exact element={<h2>Error Page </h2>} />
      <Route path="/thank-you" exact element={<h2>Thank You Page </h2>} />
      <Route path="/reservation/:id" element={<h2>Reservation details page</h2>} />
      <Route path="*" exact element={<h2>Page not found</h2>} />
    </Routes>
  );
};

const RouterGuard = ({ children }) => {
  const isAuthorized = false;
  return isAuthorized ? (
    <PrivateRoute>{children}</PrivateRoute>
  ) : (
    <Navigate replace to="/login" />
  );
};


function AllPages() {
  return (
    <Routes>
      <Route path="/login" element={<h1>Hello I am login page</h1>} exact />
      <Route path="/*" element={<RouterGuard />} />
    </Routes>
  );
}

export default AllPages;
