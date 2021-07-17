import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import LoginPage from "../login";

describe("Login form should ", () => {
  afterEach(cleanup);

  test("render username and password labels", () => {
    const mockUpdateLoginState = jest.fn();
    render(<LoginPage updateLoginState={mockUpdateLoginState} />);
    const usernameElement = screen.getByLabelText("Username");
    expect(usernameElement).toBeInTheDocument();
    const passwordElement = screen.getByLabelText("Password");
    expect(passwordElement).toBeInTheDocument();
  });

  test("should show 'Username and Password cannot be empty' message if login button is clicked with empty credentials", async () => {
    const mockUpdateLoginState = jest.fn();
    const container = render(
      <LoginPage updateLoginState={mockUpdateLoginState} />
    );
    const loginButton = container.getByText("Login");

    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);
    await waitFor(() =>
      container.getByText("Username and Password cannot be empty")
    );
  });

  test("should show 'Failed to login. Invalid credentials.' message if login button is clicked with wrong credentials", async () => {
    const mockUpdateLoginState = jest.fn();
    const container = render(
      <LoginPage updateLoginState={mockUpdateLoginState} />
    );
    const loginButton = container.getByText("Login");
    expect(loginButton).toBeInTheDocument();

    const usernameElement = screen.getByLabelText(
      "Username"
    ) as HTMLInputElement;
    fireEvent.change(usernameElement, { target: { value: "abc" } });

    const passwordElement = screen.getByLabelText(
      "Password"
    ) as HTMLInputElement;
    fireEvent.change(passwordElement, { target: { value: "3210" } });

    fireEvent.click(loginButton);
    await waitFor(() =>
      container.getByText("Failed to login. Invalid credentials.")
    );
  });

  test("should call updateLoginState once login button clicked with correct credentials", async () => {
    const mockUpdateLoginState = jest.fn();
    const container = render(
      <LoginPage updateLoginState={mockUpdateLoginState} />
    );
    const loginButton = container.getByText("Login");
    expect(loginButton).toBeInTheDocument();

    const usernameElement = screen.getByLabelText(
      "Username"
    ) as HTMLInputElement;
    fireEvent.change(usernameElement, { target: { value: "foo" } });

    const passwordElement = screen.getByLabelText(
      "Password"
    ) as HTMLInputElement;
    fireEvent.change(passwordElement, { target: { value: "bar" } });

    fireEvent.click(loginButton);
    await waitFor(() => expect(mockUpdateLoginState).toHaveBeenCalledTimes(1));
  });
});
