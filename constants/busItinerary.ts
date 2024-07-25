export type DaysOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type DaysOfWeekWithoutSunday = 1 | 2 | 3 | 4 | 5 | 6;

type BusItinerary = {
  departure: string;
  arrival: string;
};

export const busItinerary: Record<DaysOfWeekWithoutSunday, BusItinerary[]> = {
  1: [
    { departure: "6:30", arrival: "6:45" },
    { departure: "7:00", arrival: "7:20" },
    { departure: "9:00", arrival: "9:30" },
    { departure: "9:55", arrival: "10:20" },
    { departure: "10:45", arrival: "11:10" },
    { departure: "11:35", arrival: "12:00" },
    { departure: "12:25", arrival: "12:50" },
    { departure: "17:10", arrival: "18:10" },
    { departure: "18:30", arrival: "18:50" },
    { departure: "20:10", arrival: "20:35" },
    { departure: "21:25", arrival: "21:50" },
  ],
  2: [
    { departure: "6:30", arrival: "6:45" },
    { departure: "7:00", arrival: "7:20" },
    { departure: "9:00", arrival: "9:30" },
    { departure: "9:55", arrival: "10:20" },
    { departure: "10:45", arrival: "11:10" },
    { departure: "11:35", arrival: "12:00" },
    { departure: "12:25", arrival: "12:50" },
    { departure: "17:10", arrival: "18:10" },
    { departure: "18:30", arrival: "18:50" },
    { departure: "20:10", arrival: "20:35" },
    { departure: "21:25", arrival: "21:50" },
  ],
  3: [
    { departure: "6:30", arrival: "6:45" },
    { departure: "7:00", arrival: "7:20" },
    { departure: "9:00", arrival: "9:30" },
    { departure: "9:55", arrival: "10:20" },
    { departure: "10:45", arrival: "11:10" },
    { departure: "11:35", arrival: "12:00" },
    { departure: "12:25", arrival: "12:50" },
    { departure: "17:10", arrival: "18:10" },
    { departure: "18:30", arrival: "18:50" },
    { departure: "20:10", arrival: "20:35" },
    { departure: "21:25", arrival: "21:50" },
  ],
  4: [
    { departure: "6:30", arrival: "6:45" },
    { departure: "7:00", arrival: "7:20" },
    { departure: "9:00", arrival: "9:30" },
    { departure: "9:55", arrival: "10:20" },
    { departure: "10:45", arrival: "11:10" },
    { departure: "11:35", arrival: "12:00" },
    { departure: "12:25", arrival: "12:50" },
    { departure: "17:10", arrival: "18:10" },
    { departure: "18:30", arrival: "18:50" },
    { departure: "20:10", arrival: "20:35" },
    { departure: "21:25", arrival: "21:50" },
  ],
  5: [
    { departure: "6:30", arrival: "6:45" },
    { departure: "7:00", arrival: "7:20" },
    { departure: "9:00", arrival: "9:30" },
    { departure: "9:55", arrival: "10:20" },
    { departure: "10:45", arrival: "11:10" },
    { departure: "11:35", arrival: "12:00" },
    { departure: "12:25", arrival: "12:50" },
    { departure: "17:10", arrival: "18:10" },
    { departure: "18:30", arrival: "18:50" },
    { departure: "20:10", arrival: "20:35" },
    { departure: "21:25", arrival: "21:50" },
  ],
  6: [
    { departure: "6:30", arrival: "6:45" },
    { departure: "7:00", arrival: "7:20" },
    { departure: "9:00", arrival: "9:30" },
    { departure: "9:55", arrival: "10:20" },
    { departure: "10:45", arrival: "11:10" },
    { departure: "11:35", arrival: "12:00" },
    { departure: "12:25", arrival: "12:50" },
    { departure: "17:10", arrival: "18:10" },
    { departure: "18:30", arrival: "18:50" },
    { departure: "20:10", arrival: "20:35" },
    { departure: "21:25", arrival: "21:50" },
  ],
};

export const parseWeekDay = (day: DaysOfWeek): DaysOfWeekWithoutSunday => {
  return day === 0 ? 1 : day;
};

export const parseTime = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);

  return `${hour.toString().padStart(2, "0")}h${minute.toString().padStart(2, "0")}`;
};

export const defaultTimeZone = "America/Bahia" as const;
