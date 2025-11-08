import { atom } from "recoil";
import implementPersist from "../utilities/implement-persist";

export const systemPromptState = atom<string>({
  key: "systemPromptState",
  default: "",
  effects_UNSTABLE: implementPersist("systemPromptState")
});
