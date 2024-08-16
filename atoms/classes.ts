import { atom } from "jotai";
import { ClassesInDay, classSchedule } from "@/constants/classes";
import { getDay } from "date-fns";
import { DaysOfWeekWithoutSundayAndSaturday } from "@/constants/types";

export const currentDateAtom = atom(new Date());

export const currentClassRoomByDate = atom<ClassesInDay>((get) => {
  return classSchedule[
    getDay(get(currentDateAtom)) as DaysOfWeekWithoutSundayAndSaturday
  ];
});
