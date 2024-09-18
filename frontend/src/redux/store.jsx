import { userReducer } from "./reducers/userReducer";
import { postReducer } from "./reducers/postReducer";

import { configureStore } from "@reduxjs/toolkit";

export const store=configureStore({
    reducer:{
        userReducer,
        postReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        })
});