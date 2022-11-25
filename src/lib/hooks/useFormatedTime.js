import { useMemo } from "react";
import { useIntl } from "react-intl";
import { useRecoilValue } from "recoil";
import { reservationStateValue } from "../../components/store/app-store";
import { LOCALES } from "../../i18n/constants";
export const TIMEZONE = {
  JAPAN: "JST",
  ENGLISH: "EST",
};
export default function useFormatedDateTime({ time, timeZone }) {
  const intl = useIntl();
  const { locale } = useRecoilValue(reservationStateValue);
  const formatedDateTime = useMemo(() => {
    let intlTime = intl.formatDate(time, {
      year: "numeric",
      hour: "numeric",
      hour12: false,
      minute: "numeric",
      timeZone: timeZone,
      month: "2-digit",
      day: "2-digit",
    });
    if (timeZone === TIMEZONE.JAPAN) {
      const splitedTime =
        locale === LOCALES.ENGLISH ? intlTime.split(",") : intlTime.split(" ");
      const inputedDate = splitedTime[0].split("/");
      const inJapanese =
        inputedDate[2] + "年" + inputedDate[0] + "月" + inputedDate[1] + "日";
      return inJapanese + ", " + splitedTime[1];
    }
    return intlTime;
  }, [intl, locale, time, timeZone]);

  return formatedDateTime;
}
