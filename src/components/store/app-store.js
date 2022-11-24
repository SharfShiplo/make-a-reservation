import secureLocalStorage from "react-secure-storage";
import { atom, selector } from "recoil";
import { MAKE_A_RESERVATION_APP } from "../config/constant";
import { defaultNote } from "../config/note";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = secureLocalStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? secureLocalStorage.removeItem(key)
        : secureLocalStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const reservationAtom = atom({
  key: "reservationAtom",
  default: {
    current_path: "/login",
    authorized_user: false,
    login_time: null,
    personal_information_enter_time: null,
    from_to_enter_time: null,
    date_time_enter_time: null,
    amount_enter_time: null,
    note_enter_time: null,
    name: "",
    gender: null,
    location_from: null,
    location_to: null,
    reservation_date: new Date(),
    reservation_time: new Date().getTime(),
    amount: 0,
    note: defaultNote,
    reservation_id: null,
  },
  effects: [localStorageEffect(MAKE_A_RESERVATION_APP)],
});

export const reservationStateValue = selector({
  key: "reservationStateValue", 
  get: ({ get }) => {
    return get(reservationAtom);
  },
});
