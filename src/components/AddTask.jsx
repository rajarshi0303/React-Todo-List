import React from "react";
import { useState } from "react";

export default function AddTask({ tasks, setTasks }) {
  const [task, setTask] = useState("");

  function handleChange(event) {
    setTask(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTasks([...tasks, task]);
    setTask("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            id="default-search"
            value={task}
            onChange={handleChange}
            className="block w-full px-6 py-4 text-sm text-gray-900 placeholder:text-gray-700 rounded-full bg-gray-200 focus:outline-none"
            placeholder="Add Your Task..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2 bottom-1.5 bg-orange-600 hover:bg-orange-700 font-semibold rounded-full text-base px-6 py-2 "
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
}
