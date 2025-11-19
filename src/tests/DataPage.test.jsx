import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import DataPage from "../pages/DataPage";

test("renders heading", () => {
  render(
    <Provider store={store}>
      <DataPage />
    </Provider>
  );

  const heading = screen.getByText(/Words Data/i);
  expect(heading).toBeInTheDocument();
});
