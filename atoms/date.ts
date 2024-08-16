import { atom } from "jotai";
import { format, getDay } from "date-fns";
import { ptBR } from "date-fns/locale";

export const currentDateAtom = atom(new Date());

export const currentDayAtom = atom((get) => getDay(get(currentDateAtom)));

export const formattedDateAtom = atom<string>((get) =>
  format(get(currentDateAtom), "eeee, d 'de' MMMM", { locale: ptBR }).replace(
    /^\w/,
    (c) => c.toUpperCase(),
  ),
);
