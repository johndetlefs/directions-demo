import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { verifyAuth } from "./actions/";
import rootReducer from "./reducers";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {};

const persistConfig = {
  key: "auth",
  storage,
  whitelist: [] // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function initializeStore(persistedState = initialState) {
  const store = createStore(
    persistedReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
  store.dispatch(verifyAuth());
  return store;
}
