import type { Message } from "../types/msgTypes";

export const SET_MESSAGE = "SET_MESSAGE";

export const addMessage = (message: Message[]) => ({
  type: SET_MESSAGE,
  payload: message,
});
