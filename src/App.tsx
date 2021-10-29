import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { Body } from "./components/Body";

ReactDOM.render(
  <Provider store={store}>
    <Body />
  </Provider>,
  document.getElementById("root")
);
