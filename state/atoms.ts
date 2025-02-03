import { atom } from "recoil";

export const coinListState = atom({
  key: "coinListState", // key
  default: [{ coin: { 1: "이더리움", 2: "리플", 3: "도지", 4: "비트" } }], //초기값
});
