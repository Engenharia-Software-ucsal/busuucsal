import { atom } from "jotai";
import { format, getDay, isAfter } from "date-fns";
import { min, setHours, setMinutes } from "date-fns/fp";
import { ptBR } from "date-fns/locale";

import {
  busItinerary,
  DaysOfWeekWithoutSunday,
} from "@/constants/busItinerary";
import { filter, flow, map } from "lodash";

const transformTimeStringToDate = (time: string, currentDate?: Date): Date => {
  const [hour, minute] = time.split(":").map(Number);

  return flow(setHours(hour), setMinutes(minute))(currentDate ?? new Date());
};

export const currentDateAtom = atom(new Date(), (_, __, value: Date) => {
  return value;
});

export const busItineraryAtom = atom(busItinerary);

export const currentDayAtom = atom(
  (get) => getDay(get(currentDateAtom)) as DaysOfWeekWithoutSunday,
);

export const currentItineraryAtom = atom((get) => {
  return get(busItineraryAtom)[get(currentDayAtom)];
});

export const nextDeparturesAtom = atom((get) => {
  const currentDate = get(currentDateAtom);

  return filter(get(currentItineraryAtom), (value) => {
    const changedDate = transformTimeStringToDate(value.departure, currentDate);

    return isAfter(changedDate, currentDate);
  });
});

export const earlyDepartureTimeAtom = atom<string | null>((get) => {
  const currentDate = get(currentDateAtom);
  const nextDepartures = get(nextDeparturesAtom);

  const departureTimesTransformedInDates = map(nextDepartures, (value) =>
    transformTimeStringToDate(value.departure, currentDate),
  );

  if (!departureTimesTransformedInDates.length) {
    return null;
  }

  const earlyDate = min(departureTimesTransformedInDates);

  return format(earlyDate, "HH:mm", { locale: ptBR });
});

export const formattedDateAtom = atom<string>((get) =>
  format(get(currentDateAtom), "eeee, d 'de' MMMM", { locale: ptBR }).replace(
    /^\w/,
    (c) => c.toUpperCase(),
  ),
);
