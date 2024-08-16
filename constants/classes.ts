import { DaysOfWeekWithoutSundayAndSaturday } from "@/constants/types";

export type Class = {
  name: string;
  teacher: string;
  room: string;
  startAt: string;
  endAt: string;
};

export type ClassesInDay = {
  dayOfWeek: number;
  classes: Class[];
};

export const classSchedule: Record<
  DaysOfWeekWithoutSundayAndSaturday,
  ClassesInDay
> = {
  1: {
    dayOfWeek: 1,
    classes: [
      {
        teacher: "MARCO ANTÔNIO CHAVES CÂMARA",
        name: "REDES DE COMPUTADORES",
        startAt: "19:00",
        endAt: "20:15",
        room: "B408",
      },
      {
        teacher: "MARCO ANTÔNIO CHAVES CÂMARA",
        name: "REDES DE COMPUTADORES",
        startAt: "20:15",
        endAt: "21:30",
        room: "B408",
      },
    ],
  },

  2: {
    dayOfWeek: 2,
    classes: [
      {
        teacher: "FLAVIO DUSSE",
        name: "TESTES E QUALIDADE DE SOFTWARE",
        startAt: "19:00",
        endAt: "20:15",
        room: "b408",
      },
      {
        teacher: "FLAVIO DUSSE",
        name: "TESTES E QUALIDADE DE SOFTWARE",
        startAt: "20:15",
        endAt: "21:30",
        room: "b408",
      },
    ],
  },
  3: {
    dayOfWeek: 3,
    classes: [
      {
        teacher: "MARCOS DESSA DE OLIVEIRA",
        name: "PROGRAMAÇÃO PARA DISPOSITIVOS MÓVEIS",
        startAt: "19:00",
        endAt: "20:15",
        room: "B418",
      },
      {
        teacher: "MARCOS DESSA DE OLIVEIRA",
        name: "PROGRAMAÇÃO PARA DISPOSITIVOS MÓVEIS",
        startAt: "20:15",
        endAt: "21:30",
        room: "B418",
      },
    ],
  },
  4: {
    dayOfWeek: 4,
    classes: [
      {
        teacher: "MARIO JORGE PEREIRA",
        name: "PROGRAMAÇÃO ORIENTADA A OBJETOS AVANÇADA",
        startAt: "19:00",
        endAt: "20:15",
        room: "B406",
      },
      {
        teacher: "MARIO JORGE PEREIRA",
        name: "PROGRAMAÇÃO ORIENTADA A OBJETOS AVANÇADA",
        startAt: "20:15",
        endAt: "21:30",
        room: "B406",
      },
    ],
  },
  5: {
    dayOfWeek: 4,
    classes: [
      {
        teacher: "EVERTON MENDONCA DE JESUS",
        name: "SEGURANÇA E AUDITORIA DE SISTEMAS",
        startAt: "19:00",
        endAt: "20:15",
        room: "B220",
      },
      {
        teacher: "EVERTON MENDONCA DE JESUS",
        name: "SEGURANÇA E AUDITORIA DE SISTEMAS",
        startAt: "20:15",
        endAt: "21:30",
        room: "B220",
      },
    ],
  },
};
