import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../store/store";
import DataPage from "../pages/DataPage";

test("search input updates value", async () => {
  render(
    <Provider store={store}>
      <DataPage />
    </Provider>
  );

  const input = screen.getByPlaceholderText(/search by id/i);

  await userEvent.type(input, "123");

  expect(input.value).toBe("123");
});
