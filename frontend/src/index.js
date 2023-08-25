import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducer/rootReducer";

// console.log = () => {};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

// const store = createStore(rootReducer, applyMiddleware(thunk));

const clearPersistedStoreIfVersionChanged = async () => {
  const currentVersion = process.env.REACT_APP_VERSION; // Your current app version
  const storedVersion = localStorage.getItem("appVersion");
  console.log("storedVersion", storedVersion);
  console.log("currentVersion", currentVersion);
  if (currentVersion !== storedVersion) {
    await persistStore(store).purge();
    localStorage.setItem("appVersion", currentVersion);
    console.log(
      "Redux Persist store has been cleared due to app version change."
    );
  }
};

clearPersistedStoreIfVersionChanged().then(() => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
});
