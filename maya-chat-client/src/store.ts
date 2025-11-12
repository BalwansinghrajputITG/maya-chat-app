import { createStore } from "redux";
import type { Message } from "./types/msgTypes";
import { ADD_MESSAGE } from "./actions/addMessage";
import { SET_MESSAGE } from "./actions/setMessage";

interface State {
  messages: Message[];
}

const initialState: State = {
  messages: [
    { userId: 1, msg: "hello" },
    { userId: 2, msg: "hii" },
  ],
};

const messageReduser = (crrState = initialState, action: any): State => {
  switch (action.type) {
    case ADD_MESSAGE:
      return { ...crrState, messages: [...crrState.messages, action.payload] };
    case SET_MESSAGE:
      return { ...crrState, messages: action.payload };
    default:
      return crrState;
  }
};

const store = createStore(
  messageReduser,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__?.()
);

export default store;
