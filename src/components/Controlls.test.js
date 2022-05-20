import { calculatePrice, calculateTime } from "./Controlls";

const maxPricePerDay = 800 * 1000;

test("calculate price returns an output", () => {
  const distanceInKm = 1;
  const pricePerKm = 1;
  const result = calculatePrice(pricePerKm, distanceInKm * 1000).toFixed(2);
  expect(result).toBeTruthy();
});

test("constant multiplier of 110% of the sum", () => {
  const distanceInKm = 1;
  const pricePerKm = 1;
  const result = calculatePrice(pricePerKm, distanceInKm * 1000).toFixed(2);
  expect(result).toBe("1.10");
});

test("calculate time returns an output", () => {
  const distanceInKm = 1;
  const distanceInMeters = distanceInKm * 1000;
  const rawTime = distanceInMeters / maxPricePerDay;

  const result = calculateTime(rawTime);
  expect(result).toBeTruthy();
});

test("calculate time returns object", () => {
  const distanceInKm = 1;
  const distanceInMeters = distanceInKm * 1000;
  const rawTime = distanceInMeters / maxPricePerDay;

  const result = calculateTime(rawTime);
  expect(typeof result).toBe("object");
});

test("calculate time returns days, hours, minutes", () => {
  const distanceInKm = 1;
  const distanceInMeters = distanceInKm * 1000;
  const rawTime = distanceInMeters / maxPricePerDay;

  const result = calculateTime(rawTime);
  expect(typeof result.days).toBeTruthy();
  expect(typeof result.hours).toBeTruthy();
  expect(typeof result.minutes).toBeTruthy();
});

test("can't drive more than 800 km per day", () => {
  const distanceInKm = 890;
  const distanceInMeters = distanceInKm * 1000;
  const rawTime = distanceInMeters / maxPricePerDay;

  const result = calculateTime(rawTime);
  expect(result.days).toBeGreaterThan(0);
});

test("drive 1800km", () => {
  const distanceInKm = 1800;
  const distanceInMeters = distanceInKm * 1000;
  const rawTime = distanceInMeters / maxPricePerDay;

  const result = calculateTime(rawTime);
  expect(result.days).toBe(2);
  expect(result.hours).toBeGreaterThan(0);
});

test("pay for 2200km", () => {
  const distanceInKm = 2200;
  const pricePerKm = 1;
  const result = calculatePrice(pricePerKm, distanceInKm * 1000).toFixed(2);
  expect(result).toBe("2860.00");
});

test("calculate time and price for 3000km", () => {
  const distanceInKm = 3000;
  const distanceInMeters = distanceInKm * 1000;
  const rawTime = distanceInMeters / maxPricePerDay;
  const pricePerKm = 1;
  const price = calculatePrice(pricePerKm, distanceInKm * 1000).toFixed(2);
  const time = calculateTime(rawTime);
  expect(price).toBe("3960.00");
  expect(time.days).toBe(3);
  expect(time.hours).toBeGreaterThan(0);
});
