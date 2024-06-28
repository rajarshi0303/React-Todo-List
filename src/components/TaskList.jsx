import React from "react";
import { useState } from "react";
import TaskLeft from "./TaskLeft";

export default function TaskList({ tasks, setTasks }) {
  const [completedTasks, setCompletedTasks] = useState(0);

  const removeTask = (id) => {
    setTasks(tasks.filter((task, index) => index !== id));
  };

  const handleCheckboxChange = (checked) => {
    setCompletedTasks(checked ? completedTasks + 1 : completedTasks - 1);
  };
  return (
    <>
      <ul className="mt-4 px-2 space-y-4 text-gray-500 list-inside dark:text-gray-400">
        {tasks.map((task, index) => (
          <TaskCard
            key={index}
            id={index}
            task={task}
            removeTask={removeTask}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
      </ul>
      <TaskLeft numberOfTaskLeft={tasks.length - completedTasks} />
    </>
  );
}

function TaskCard({ id, task, removeTask, onCheckboxChange }) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
    onCheckboxChange(e.target.checked);
  };
  return (
    <>
      <li className="flex items-center justify-between">
        <div className="relative flex flex-wrap items-center">
          <input
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-slate-500 bg-white transition-colors checked:bg-orange-700 checked:border-orange-700 focus:outline-none "
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
            id={`id-${id}`}
          />
          <label
            className={`${
              checked ? " text-stone-400 line-through" : "text-slate-600 "
            } cursor-pointer pl-2 capitalize`}
            htmlFor={`id-${id}`}
          >
            {task}
          </label>
          <svg
            className="pointer-events-none absolute left-0 top-0.5 h-5 w-5 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            aria-labelledby="title-1 description-1"
            role="graphics-symbol"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.8116 5.17568C12.9322 5.2882 13 5.44079 13 5.5999C13 5.759 12.9322 5.91159 12.8116 6.02412L7.66416 10.8243C7.5435 10.9368 7.37987 11 7.20925 11C7.03864 11 6.87501 10.9368 6.75435 10.8243L4.18062 8.42422C4.06341 8.31105 3.99856 8.15948 4.00002 8.00216C4.00149 7.84483 4.06916 7.69434 4.18846 7.58309C4.30775 7.47184 4.46913 7.40874 4.63784 7.40737C4.80655 7.406 4.96908 7.46648 5.09043 7.57578L7.20925 9.55167L11.9018 5.17568C12.0225 5.06319 12.1861 5 12.3567 5C12.5273 5 12.691 5.06319 12.8116 5.17568Z"
            />
          </svg>
        </div>

        <button
          type="button"
          onClick={() => removeTask(id)}
          data-testid={`remove-task-${id}`}
          className="font-semibold rounded-full text-gray-500 hover:bg-slate-200 p-1"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            ></path>
          </svg>
        </button>
      </li>
    </>
  );
}
