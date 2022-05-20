import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "./PDF";

const maxDistancePerDay = 800 * 1000;
const maxPricePerDay = 1000;

export const calculatePrice = (pricePerLiter, distance) => {
  let totalPrice;
  if (distance > maxDistancePerDay) {
    const price = Math.floor(distance / maxDistancePerDay) * maxPricePerDay;
    const remainingDistance = distance % maxDistancePerDay;
    totalPrice = (pricePerLiter * (remainingDistance / 1000) + price) * 1.1;
  } else {
    totalPrice = pricePerLiter * (distance / 1000) * 1.1;
  }
  return totalPrice;
};

export const calculateTime = (time) => {
  const days = Math.floor(time);
  const hours = Math.floor((time - days) * 24);
  const minutes = Math.floor(((time - days) * 24 - hours) * 60);
  return { days, hours, minutes };
};

export default function Controlls({ directions }) {
  const [price, setPrice] = useState(0.1);
  const [fullPrice, setFullPrice] = useState(1);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0 });

  const route = useMemo(
    () => (directions ? directions.routes[0].legs[0] : 0),
    [directions]
  );

  useEffect(() => {
    //calculate time at the start
    const distance = route.distance.value;
    const time = distance / maxDistancePerDay;
    setTime(calculateTime(time));

    //calculate default price at the start
    const totalPrice = calculatePrice(distance, 0.1);
    setFullPrice(totalPrice.toFixed(2));
  }, [route.distance.value]);

  const handlePriceChange = (pricePerLiter) => {
    setPrice(pricePerLiter);

    if (!route) return;

    const distance = route.distance.value;
    const totalPrice = calculatePrice(distance, pricePerLiter);

    setFullPrice(totalPrice.toFixed(2));
  };

  return (
    <>
      <div className="inline-flex justify-start w-full my-1">
        <Link
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold rounded px-2 text-xl"
          to="/"
        >
          &#x2190;
        </Link>
        <h1 className="align-middle text-3xl font-bold text-slate-50 mx-auto">
          Info
        </h1>
      </div>
      <hr></hr>
      <p className="text-l text-slate-50 mb-2">
        <b>Price per km:</b>
        <input
          type="number"
          inputMode="numeric"
          step="0.1"
          min="0.1"
          max="100"
          value={price}
          onChange={(e) => handlePriceChange(e.target.value)}
          className="mt-5 mx-1 w-1/4 text-black"
        />
        PLN
      </p>
      <p className="text-l text-slate-50 my-1">
        <b>Total price:</b> {fullPrice} PLN
      </p>
      <p className="text-l text-slate-50 my-1">
        <b>Distance:</b> {(route.distance.value / 1000).toFixed(2)} km
      </p>
      <p className="text-l text-slate-50 my-1">
        <b>Time:</b> {time.days} days, {time.hours} hours, {time.minutes}{" "}
        minutes
      </p>
      <p className="text-l text-slate-50 my-2">
        <b>Start address:</b> {route.end_address}
      </p>
      <p className="text-l text-slate-50 my-2">
        <b>End address:</b> {route.start_address}
      </p>
      <div className="mt-5 flex justify-center items-center">
        <PDFDownloadLink
          document={
            <PDF
              fullPrice={fullPrice}
              distance={(route.distance.value / 1000).toFixed(2)}
              price={price}
              time={time}
              startAddress={route.start_address}
              endAddress={route.end_address}
            />
          }
          fileName="travel.pdf"
        >
          {({ loading }) =>
            loading ? (
              <button className="bg-gray-500 hover:bg-gray-400 cursor-default text-white font-bold rounded px-2 text-xl">
                Download as PDF
              </button>
            ) : (
              <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold rounded px-2 text-xl">
                Download as PDF
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
    </>
  );
}
