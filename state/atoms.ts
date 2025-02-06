import { Coin, SelectSymbol } from "@/models/Coin";
import { atom } from "recoil";

export const coinListState = atom<Coin[]>({
  key: "coinListState", // key
  default: [
    {
      id: "1",
      name: "이더리움",
      price: "1000",
    },
    {
      id: "2",
      name: "리플",
      price: "2000",
    },
    {
      id: "3",
      name: "도지",
      price: "3000",
    },
    {
      id: "4",
      name: "비트",
      price: "4000",
    },
  ], //초기값
});
export const selectSymbolState = atom<SelectSymbol>({
  key: "selectSymbolState", // key
  default: undefined, //초기값
});
