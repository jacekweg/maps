import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import Controlls from "./Controlls";

const equal = require("fast-deep-equal/es6/react");

export default function Map({
  start,
  setStart,
  finish,
  setFinish,
  history,
  setHistory,
}) {
  const [directions, setDirections] = useState();
  const mapRef = useRef();

  const center = useMemo(() => ({ lat: 52.2296756, lng: 21.0122287 }), []);

  const options = useMemo(
    () => ({
      mapId: "ecbda71d45b6aef5",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const onLoad = useCallback(
    (map) => {
      mapRef.current = map;

      if (!start || !finish) {
        setDirections(null);
        return;
      }

      // eslint-disable-next-line no-undef
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: start,
          destination: finish,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result) {
            setDirections(result);
            setStart(null);
            setFinish(null);
          } else {
            console.error(result, status);
            setDirections(null);
          }
        }
      );
    },
    [start, finish, setStart, setFinish]
  );

  useEffect(() => {
    let start = null;
    let finish = null;
    if (directions) {
      start = directions.routes[0].legs[0].start_address;
      finish = directions.routes[0].legs[0].end_address;
    }
    if (!start || !finish) return;
    //dont add two of the same addresses to history
    if (!history[0]) {
      if (start && finish) {
        setHistory((history) => [...history, { start: start, finish: finish }]);
      }
      return;
    }
    if (
      !equal(start, history[history.length - 1].start) ||
      !equal(finish, history[history.length - 1].finish)
    ) {
      setHistory((history) => [...history, { start: start, finish: finish }]);
    }
  }, [directions, history, setHistory]);

  return (
    <div className="h-screen flex">
      <div className="w-1/5 p-4 bg-[#14161a]">
        {directions && <Controlls directions={directions} />}
        {!directions && (
          <>
            <div className="inline-flex justify-start w-full my-1">
              <Link
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold rounded px-2 text-xl"
                to="/"
              >
                &#x2190;
              </Link>
            </div>
            <h1 className="text-xl font-bold text-slate-50 mx-auto text-center">
              No directions found
            </h1>
          </>
        )}
      </div>
      <div className="h-screen w-4/5">
        <GoogleMap
          zoom={15}
          center={start || finish || center}
          mapContainerClassName="w-100 h-screen"
          options={options}
          onLoad={onLoad}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    </div>
  );
}
