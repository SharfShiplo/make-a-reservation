import { Fragment } from "react";
import { IntlProvider } from "react-intl";
import { useRecoilValue } from "recoil";
import { reservationStateValue } from "../components/store/app-store";
import { LOCALES } from "./constants";
import localeMessages from "./messages";

const ReactIntlProvider = ({ children, locale = LOCALES.ENGLISH }) => {
  return (
    <IntlProvider
      textConponent={Fragment}
      locale={locale}
      messages={localeMessages[locale]}
    >
      {children}
    </IntlProvider>
  );
};

const ProviderWrapper = ({ children }) => {
  const reservationState = useRecoilValue(reservationStateValue);

  return <ReactIntlProvider locale={reservationState.locale ?? 'en-US'}>{children}</ReactIntlProvider>;
};
export default ProviderWrapper;
