import { render, screen, cleanup } from "@testing-library/react";
import Header from "../header";

describe("header should ", () => {
  const mockUpdateLoginState = jest.fn();
  afterEach(cleanup);

  test("render 'Contacts App' header", () => {
    render(
      <Header loginState={false} updateLoginState={mockUpdateLoginState} />
    );
    const headerElement = screen.getByText("Contacts App");
    expect(headerElement).toBeInTheDocument();
  });

  test("not render logout button if loginState is false", () => {
    render(
      <Header loginState={false} updateLoginState={mockUpdateLoginState} />
    );
    const logoutButton = screen.queryByText("Logout");
    expect(logoutButton).not.toBeInTheDocument();
  });

  test("render logout button if loginState is true", () => {
    render(
      <Header loginState={true} updateLoginState={mockUpdateLoginState} />
    );
    const logoutButton = screen.getByText("Logout");
    expect(logoutButton).toBeInTheDocument();
  });
});
