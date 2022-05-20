import { Link } from "react-router-dom";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function Home({ setStart, setFinish, history }) {
  const {
    ready: readyStart,
    value: valueStart,
    setValue: setValueStart,
    suggestions: { status: statusStart, data: dataStart },
    clearSuggestions: clearSuggestionsStart,
  } = usePlacesAutocomplete();

  const {
    ready: readyFinish,
    value: valueFinish,
    setValue: setValueFinish,
    suggestions: { status: statusFinish, data: dataFinish },
    clearSuggestions: clearSuggestionsFinish,
  } = usePlacesAutocomplete();

  const selectStart = async (address) => {
    setValueStart(address, false);
    clearSuggestionsStart();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setStart({ lat, lng });
  };

  const selectFinish = async (address) => {
    setValueFinish(address, false);
    clearSuggestionsFinish();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setFinish({ lat, lng });
  };

  return (
    <div className="h-screen w-screen bg-gray-800">
      <div className="w-1/5 h-screen p-4 bg-[#14161a] overflow-x-auto">
        <h1 className="text-3xl font-bold text-slate-50 mx-auto text-center">
          History
        </h1>
        <hr></hr>
        {history.length > 0 &&
          history.map((item, index) => (
            <div key={index} className="text-l text-slate-50 mx-2">
              <p className="my-1">
                <b>Start: </b>
                {item.start}
              </p>
              <p className="my-1">
                <b>Finish: </b>
                {item.finish}
              </p>
              <hr></hr>
            </div>
          ))}
        {history.length <= 0 && (
          <h1 className="text-xl font-bold text-slate-50 mx-auto mt-8 text-center">
            No history yet
          </h1>
        )}
      </div>
      <div className="absolute top-1/2 left-[58vw] -translate-x-1/2 -translate-y-1/2 py-20 px-56 border-2 border-black bg-[#DCCCBB]">
        <p className="text-l font-bold text-slate-600">Start location</p>
        <Combobox onSelect={selectStart}>
          <ComboboxInput
            value={valueStart}
            onChange={(e) => setValueStart(e.target.value)}
            disabled={!readyStart}
            placeholder="Enter a location"
            className="w-100 p-2"
          />
          <ComboboxPopover>
            <ComboboxList>
              {statusStart === "OK" &&
                dataStart.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
        <p className="mt-10 text-l font-bold text-slate-600">Destination</p>
        <Combobox onSelect={selectFinish}>
          <ComboboxInput
            value={valueFinish}
            onChange={(e) => setValueFinish(e.target.value)}
            disabled={!readyFinish}
            placeholder="Enter a location"
            className="w-100 p-2"
          />
          <ComboboxPopover>
            <ComboboxList>
              {statusFinish === "OK" &&
                dataFinish.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
        <div className="w-full flex content-center">
          <Link
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mx-auto mt-12"
            to="/map"
          >
            See directions
          </Link>
        </div>
      </div>
    </div>
  );
}
