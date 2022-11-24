import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { reservationStateValue } from "../store/app-store";
import { ROUTES } from "../utils/routes";

const useAppTitle = ( ) => {
  const reservationState = useRecoilValue(reservationStateValue);
  const [appTitle, setAppTitle] = useState("Login");

  useEffect(() => {
    switch (reservationState.current_path) {
      case ROUTES.HOME:
        setAppTitle("Welcome Back");
        break;
      case ROUTES.PERSONALINFO:
        setAppTitle("Personal Information");
        break;
      case ROUTES.TOFROM:
        setAppTitle(`${reservationState?.name || "Unknown user"}: Select From and To Location`);
        break;
      case ROUTES.DATETIME:
        setAppTitle(`${reservationState?.location_from?.ja} ->${reservationState?.location_to?.ja}: Select Date and Time`);
        break;
      case ROUTES.PAYMENT:
        setAppTitle(`${reservationState?.name || "Unknown user"}: How much do you pay?`);
        break;
      case ROUTES.NOTE:
        setAppTitle(`${reservationState?.name || "Unknown user"}: Enter Note`);
        break;
      case ROUTES.FINAL_CONFIRMATION:
        setAppTitle(`${reservationState?.name || "Unknown user"}: Final confirmation`);
        break;
      case ROUTES.ERROR:
        setAppTitle('Error');
        break;
      case ROUTES.THANKYOU:
        setAppTitle(`${reservationState?.name || "Unknown user"}: ${reservationState?.reservation_id || "Unknown"}`);
        break;
      default:
        setAppTitle("Login");
    }
  }, [reservationState]);
  return appTitle;
};

function AppHeader() {
  const appTitle = useAppTitle();
  return (
    <header className="bg-white shadow fixed top-0 left-0 w-full z-40 h-16 flex items-center justify-center">
      <nav className="px-5 py-4 flex items-center justify-center w-full max-w-[1440px] h-full">
        <h2>{appTitle}</h2>
      </nav>
    </header>
  );
}

export default AppHeader;
