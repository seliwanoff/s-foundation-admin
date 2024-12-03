import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import RouteWrapper from "./route/route";
import { fetchUserData } from "./slice/AuthSlice";

function App() {
  const FetchUserDetails = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchUserData());
    }, [dispatch]);

    return null;
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <FetchUserDetails />
        <RouteWrapper />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
