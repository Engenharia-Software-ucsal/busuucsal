import { atom } from "jotai";
import { ClassesInDay, classSchedule } from "@/constants/classes";
import { getDay, isAfter } from "date-fns";
import { DaysOfWeekWithoutSundayAndSaturday } from "@/constants/types";
import { transformTimeStringToDate } from "@/constants/helpers";
import { isEmpty, reduce } from "lodash";

export const currentDateAtom = atom(new Date());

export const currentClassRoomByDateAtom = atom<ClassesInDay>((get) => {
  return classSchedule[
    getDay(get(currentDateAtom)) as DaysOfWeekWithoutSundayAndSaturday
  ];
});

export const currentEarlyClassAtom = atom<{ room: string; date: string }>(
  (get) => {
    const currentClassRoom = get(currentClassRoomByDateAtom);
    const currentDate = get(currentDateAtom);

    return reduce(
      currentClassRoom.classes,
      (acc, current) => {
        if (isEmpty(acc)) {
          acc = {
            room: current.room,
            date: current.startAt,
          };
          return acc;
        }

        const accStartAt = transformTimeStringToDate(acc.date, currentDate);
        const currentStartAt = transformTimeStringToDate(
          current.startAt,
          currentDate,
        );

        acc = isAfter(accStartAt, currentStartAt)
          ? { room: current.room, date: current.startAt }
          : acc;

        return acc;
      },
      {} as { room: string; date: string },
    );
  },
);
