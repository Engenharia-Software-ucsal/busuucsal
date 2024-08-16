import { atom } from "jotai";
import { format, formatDistance, isAfter } from "date-fns";
import { min } from "date-fns/fp";
import { ptBR } from "date-fns/locale";

import { busItinerary } from "@/constants/busItinerary";
import { filter, map } from "lodash";
import { transformTimeStringToDate } from "@/constants/helpers";
import { currentDateAtom, currentDayAtom } from "@/atoms/date";
import { DaysOfWeekWithoutSunday } from "@/constants/types";

export const currentItineraryAtom = atom((get) => {
  return busItinerary[get(currentDayAtom) as DaysOfWeekWithoutSunday];
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

export const distanceToNextDepartureAtom = atom((get) => {
  const earlyDepartureDate = get(earlyDepartureDateAtom);

  return earlyDepartureDate
    ? formatDistance(earlyDepartureDate, get(currentDateAtom), {
        locale: ptBR,
        addSuffix: true,
      })
    : "";
});
