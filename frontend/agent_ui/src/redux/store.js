import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatSlices";

 const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});
//export default store;
export { store };
