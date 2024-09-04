import React from "react";
import { Task, TaskStateColor } from "../../types/task";

type BaseTaskAttributes = React.ComponentPropsWithoutRef<"li">;

interface taskProps extends BaseTaskAttributes {
  task: Task;
}

const TaskCard = (props: taskProps) => {
  const { task, ...rest } = props;

  return (
    <li
      {...rest}
      className="relative p-5 border border-neutral-300 rounded-md overflow-hidden cursor-pointer duration-150 hover:shadow-lg"
    >
      <div className={`absolute right-0 inset-y-2 w-2 rounded-l-xl ${TaskStateColor[task.state]}`}></div>
      <h5 className="font-semibold text-lg">{task?.title}</h5>
      <p className="text-sm text-neutral-600">{task?.description}</p>
      <div className="flex mt-2">
        <p className="ml-auto text-sm text-neutral-500">{task?.state}</p>
      </div>
    </li>
  );
};

export default TaskCard;
