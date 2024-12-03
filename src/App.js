import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import RouteWrapper from "./route/route";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouteWrapper />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
