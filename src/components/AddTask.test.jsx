import { render, screen, fireEvent } from "@testing-library/react";
import AddTask from "./AddTask";
import "@testing-library/jest-dom";

describe("AddTask Component testing", () => {
  test("'renders the input field and button' ", () => {
    render(<AddTask />);

    // Check if input and button are rendered
    const inputField = screen.getByPlaceholderText("Add Your Task...");
    const addButton = screen.getByText("ADD");

    expect(inputField).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test("updates the input field value when typing", () => {
    const tasks = [];
    const setTasks = jest.fn();
    render(<AddTask tasks={tasks} setTasks={setTasks} />);

    const inputField = screen.getByPlaceholderText("Add Your Task...");
    fireEvent.change(inputField, { target: { value: "Buy groceries" } });

    expect(inputField.value).toBe("Buy groceries");
  });

  it("adds a new task when submitting the form", () => {
    const tasks = [];
    const setTasks = jest.fn();
    render(<AddTask tasks={tasks} setTasks={setTasks} />);

    const inputField = screen.getByPlaceholderText("Add Your Task...");
    const addButton = screen.getByText("ADD");

    fireEvent.change(inputField, { target: { value: "Buy groceries" } });
    fireEvent.click(addButton);

    expect(setTasks).toHaveBeenCalledWith(["Buy groceries"]);
    expect(inputField.value).toBe("");
  });
});
