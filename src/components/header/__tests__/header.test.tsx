import { render, screen } from "@testing-library/react";
import Header from "../header";

test("renders assets header", () => {
  render(<Header />);
  const headerElement = screen.getByText("Contacts");
  expect(headerElement).toBeInTheDocument();
});
