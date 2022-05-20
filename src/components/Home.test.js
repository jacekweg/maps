import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

test("renders history element", () => {
  render(
    <Router>
      <Routes>
        <Route exact path="/" element={<Home history={[]} />} />
      </Routes>
    </Router>
  );
  const header = screen.getByText("History");
  expect(header).toBeInTheDocument();
});

test("renders button", () => {
  render(
    <Router>
      <Routes>
        <Route exact path="/" element={<Home history={[]} />} />
      </Routes>
    </Router>
  );
  const button = screen.getByRole("link", { name: /see directions/i });
  expect(button).toBeInTheDocument();
});

test("renders inputs", () => {
  render(
    <Router>
      <Routes>
        <Route exact path="/" element={<Home history={[]} />} />
      </Routes>
    </Router>
  );
  const input = screen.getAllByRole("combobox");
  expect(input.length).toEqual(2);
});
