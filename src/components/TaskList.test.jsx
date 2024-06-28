import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import TaskList from "./TaskList";

describe("TaskList testing", () => {
  it("renders tasks correctly", () => {
    const tasks = ["Buy groceries", "Clean the house"];
    const setTasks = jest.fn();
    render(<TaskList tasks={tasks} setTasks={setTasks} />);

    const taskItems = screen.getAllByRole("listitem");
    expect(taskItems).toHaveLength(2);
    expect(taskItems[0].textContent).toBe("Buy groceries");
    expect(taskItems[1].textContent).toBe("Clean the house");
  });

  it("removes a task when the remove button is clicked", () => {
    const tasks = ["Buy groceries", "Clean the house"];
    const setTasks = jest.fn();
    render(<TaskList tasks={tasks} setTasks={setTasks} />);

    const removeButtons = screen.getAllByRole("button");
    fireEvent.click(removeButtons[0]);

    expect(setTasks).toHaveBeenCalledWith(["Clean the house"]);
  });

  test("marks the task as completed when the checkbox is checked", async () => {
    const tasks = ["Buy groceries", "Clean the house"];
    const setTasks = jest.fn();
    render(<TaskList tasks={tasks} setTasks={setTasks} />);

    // Select the checkbox for "Buy groceries"
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);

    // Select the label for "Buy groceries"
    const taskLabel = await screen.findByText("Buy groceries");

    // Expect the label to have the completed classes
    expect(taskLabel).toHaveClass("text-stone-400 line-through");

    // Uncheck the checkbox (mark as not completed)
    fireEvent.click(checkboxes[0]);

    // Expect the label to not have the completed classes
    expect(taskLabel).not.toHaveClass("text-stone-400 line-through");
  });

  test("updates the completed tasks count when a checkbox is checked/unchecked", async () => {
    const tasks = ["Buy groceries", "Clean the house", "Walk the dog"];
    const setTasks = jest.fn();
    render(<TaskList tasks={tasks} setTasks={setTasks} />);

    // Verify initial state: all tasks uncompleted
    let tasksLeft = screen.getByTestId("tasks-left");
    expect(tasksLeft).toHaveTextContent("3 tasks left");

    // Select the checkboxes
    const checkboxes = screen.getAllByRole("checkbox");

    // Check the first checkbox (mark "Buy groceries" as completed)
    fireEvent.click(checkboxes[0]);
    tasksLeft = screen.getByTestId("tasks-left");
    expect(tasksLeft).toHaveTextContent("2 tasks left");

    // Check the second checkbox (mark "Clean the house" as completed)
    fireEvent.click(checkboxes[1]);
    tasksLeft = screen.getByTestId("tasks-left");
    expect(tasksLeft).toHaveTextContent("1 task left");

    // Uncheck the first checkbox (mark "Buy groceries" as not completed)
    fireEvent.click(checkboxes[0]);
    tasksLeft = screen.getByTestId("tasks-left");
    expect(tasksLeft).toHaveTextContent("2 tasks left");

    // Uncheck the second checkbox (mark "Clean the house" as not completed)
    fireEvent.click(checkboxes[1]);
    tasksLeft = screen.getByTestId("tasks-left");
    expect(tasksLeft).toHaveTextContent("3 tasks left");
  });
});
