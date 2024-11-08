import { atom } from "jotai";


export type AlertType = "van" | "buss-late"



export const selectAtom = atom<AlertType | null>(null)


