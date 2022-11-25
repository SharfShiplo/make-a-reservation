import { useMemo } from "react";
import { useIntl } from "react-intl";
export const CURRENCY = {
  JAPAN: "JPY",
  BANGLADESH: "BDT",
};
export default function useFormatedAmount({
  currency,
  value,
  exchangeRate = 1,
}) {
  const intl = useIntl();

  const formatedAmount = useMemo(() => {
    let amount = value;
    if (currency === CURRENCY.JAPAN) {
      amount = Math.round(value * exchangeRate);
    }
    return intl.formatNumber(amount, { style: "currency", currency: currency });
  }, [intl, currency, value, exchangeRate]);

  return formatedAmount;
}