import { atom } from "recoil";
import type { Session } from "../interfaces/session";
import { defaultUser } from "./user";
import type { PaginationResponse } from "../interfaces";

export const defaultSession: Session = {
  id: "",
  isDeleted: false,
  messages: [],
  user: defaultUser,
  video: "",
  name: ""
};

export const currentSessionState = atom({
  key: "currentSessionState",
  default: defaultSession
});

export const videoTimestampState = atom({
  key: "videoTimestampState",
  default: 0 // timestamp in seconds
});

export const sessionListState = atom<PaginationResponse<Session>>({
  key: "sessionListState",
  default: {
    list: [],
    totalCount: 0,
    totalPages: 0
  }
});

export const exportSessionState = atom({
  key: "exportSessionState",
  default: defaultSession
});
