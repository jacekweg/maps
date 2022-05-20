import React from "react";
import { useMemo, useState } from "react";
import "./index.css";
import Home from "./components/Home";
import Map from "./components/Map";
import Info from "./components/Info";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";

function App() {
  const [start, setStart] = useState();
  const [finish, setFinish] = useState();
  const [history, setHistory] = useState([]);
  const libraries = useMemo(() => ["places"], []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  if (loadError) return <Info message={"Error loading Google Maps API"}></Info>;
  if (!isLoaded) return <Info message={"Loading in progress"}></Info>;

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                setStart={(address) => {
                  setStart(address);
                }}
                setFinish={(address) => {
                  setFinish(address);
                }}
                history={history}
              />
            }
          />
          <Route
            path="/map"
            element={
              <Map
                start={start}
                finish={finish}
                history={history}
                setHistory={(history) => {
                  setHistory(history);
                }}
                setStart={(address) => {
                  setStart(address);
                }}
                setFinish={(address) => {
                  setFinish(address);
                }}
              />
            }
          />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;
