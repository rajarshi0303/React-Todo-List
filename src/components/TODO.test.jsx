import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import TODO from "./TODO";

//Integration testing

describe("Integration testing", () => {
  test("'renders the input field and button' ", async () => {
    render(<TODO />);

    const inputField = screen.getByPlaceholderText("Add Your Task...");
    const addButton = screen.getByText("ADD");

    fireEvent.change(inputField, { target: { value: "Buy groceries" } });
    fireEvent.click(addButton);
    const taskItem = await screen.findByText("Buy groceries");
    const tasksLeft = screen.getByTestId("tasks-left");

    expect(taskItem).toBeInTheDocument();
    expect(tasksLeft).toHaveTextContent("1 task left");
  });
});
//This test verifies that a task can be added and that the task count is updated.

const addTasks = (tasks) => {
  const inputField = screen.getByPlaceholderText("Add Your Task...");
  const addButton = screen.getByText("ADD");

  tasks.forEach((task) => {
    fireEvent.change(inputField, { target: { value: task } });
    fireEvent.click(addButton);
  });
};

describe("Multiple Task Integration Tests", () => {
  test("should add multiple tasks, complete and remove them", async () => {
    render(<TODO />);
    const tasks = ["Buy groceries", "Clean the house", "Walk the dog"];
    // Adding multiple tasks
    addTasks(tasks);

    // Assert tasks are added
    tasks.forEach(async (task) => {
      const taskItem = await screen.findByText(task);
      expect(taskItem).toBeInTheDocument();
    });

    // Assert initial tasks left count
    let tasksLeft = screen.getByTestId("tasks-left");
    expect(tasksLeft).toHaveTextContent("3 tasks left");

    // Mark the first task as completed
    const taskCheckboxes = screen.getAllByRole("checkbox");
    fireEvent.click(taskCheckboxes[0]);
    // Verify tasks left after marking first task as completed
    tasksLeft = screen.getByTestId("tasks-left");
    expect(tasksLeft).toHaveTextContent("2 tasks left");

    // Remove the second task (index 1)
    const removeButton = screen.getByTestId("remove-task-1");
    fireEvent.click(removeButton);
    // Ensure the second task is removed
    expect(screen.queryByText("Clean the house")).not.toBeInTheDocument();

    // Verify tasks left count after removing the second task
    tasksLeft = screen.getByTestId("tasks-left");
    expect(tasksLeft).toHaveTextContent("1 task left");
  });
});
