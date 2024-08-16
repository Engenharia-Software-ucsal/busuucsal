import { atom } from "jotai";
import { format, formatDistance, getDay, isAfter } from "date-fns";
import { min } from "date-fns/fp";
import { ptBR } from "date-fns/locale";

import { busItinerary } from "@/constants/busItinerary";
import { filter, map } from "lodash";
import { DaysOfWeekWithoutSunday } from "@/constants/types";
import { transformTimeStringToDate } from "@/constants/helpers";

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

export const earlyDepartureDateAtom = atom<Date | null>((get) => {
  const currentDate = get(currentDateAtom);
  const nextDepartures = get(nextDeparturesAtom);

  const departureTimesTransformedInDates = map(nextDepartures, (value) =>
    transformTimeStringToDate(value.departure, currentDate),
  );

  if (!departureTimesTransformedInDates.length) {
    return null;
  }

  return min(departureTimesTransformedInDates);
});

export const earlyDepartureTimeAtom = atom((get) => {
  const earlyDepartureDate = get(earlyDepartureDateAtom);

  return earlyDepartureDate
    ? format(earlyDepartureDate, "HH:mm", { locale: ptBR })
    : null;
});

export const formattedDateAtom = atom<string>((get) =>
  format(get(currentDateAtom), "eeee, d 'de' MMMM", { locale: ptBR }).replace(
    /^\w/,
    (c) => c.toUpperCase(),
  ),
);

export const distanceToNextDepartureAtom = atom((get) => {
  const earlyDepartureDate = get(earlyDepartureDateAtom);

  return earlyDepartureDate
    ? formatDistance(earlyDepartureDate, get(currentDateAtom), {
        locale: ptBR,
      })
    : "";
});
