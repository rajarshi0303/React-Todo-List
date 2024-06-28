import React from "react";

export default function TaskLeft({ numberOfTaskLeft }) {
  return (
    <div>
      <h1 data-testid="tasks-left" className="mt-6 px-4">
        {numberOfTaskLeft} {numberOfTaskLeft === 1 ? "task" : "tasks"} left
      </h1>
    </div>
  );
}
