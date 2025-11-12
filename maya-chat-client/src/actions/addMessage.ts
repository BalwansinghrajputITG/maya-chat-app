import type { Message } from "../types/msgTypes";

export const ADD_MESSAGE = "ADD_MESSAGE";

export const addMessage = (message: Message) => ({
  type: ADD_MESSAGE,
  payload: message,
});
