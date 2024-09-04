import { useState } from "react";
import BadgedButton from "../components/badgeButton";
import TaskCard from "../components/task/taskCard";
import TaskModal from "../components/task/taskModal";
import Button from "../components/button";
import { Task } from "../types/task";
import { LogOut, Plus } from "lucide-react";
import useTasks from "../hooks/useTasks";
import useAuth from "../hooks/useAuth";
import { FILTER_BADGED_BUTTONS } from "../utils";

const HomePage = () => {
  // Get the login state
  const { signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const { tasks, filterTask } = useTasks();
  const [currentActiveFilter, setCurrentActiveFilter] = useState<string | null>(
    null
  );

  function showModal() {
    setIsOpen(true);
  }

  function hideModal() {
    setIsOpen(false);
  }

  // Show modal for create a new task
  function createTask() {
    setCurrentTask(null);
    showModal();
  }

  // Show the details of the task
  function showTask(task: Task) {
    setCurrentTask(task);
    showModal();
  }

  // Fucntion to get task by the state
  function showFilterTask(state?: "pending" | "during" | "completed" | null) {
    setCurrentActiveFilter(state!);
    filterTask(state!);
  }

  return (
    <main className="p-4 md:p-8 lg:p-16">
      <div className="flex flex-col items-start mb-5">
        <h2 className="text-2xl font-semibold mb-2">Task management</h2>
        <hr className="w-16 border-t border-black" />
      </div>

      {/* Filter section */}
      <div className="flex items-center justify-between">
        <ul className="flex flex-wrap items-center gap-2">
          {FILTER_BADGED_BUTTONS.map((filter) => (
            <li key={filter.id}>
              <BadgedButton
                active={filter.state === currentActiveFilter}
                stateColor={filter?.stateColor}
                onClick={() =>
                  showFilterTask(
                    filter?.state! as "pending" | "during" | "completed"
                  )
                }
              >
                {filter.label}
              </BadgedButton>
            </li>
          ))}
        </ul>
        <div className="flex items-center">
          <Button
            id="createTaskBtn"
            className="fixed z-30 md:z-0 md:relative right-3 md:right-0 bottom-3 md:top-0 md:flex size-12 md:w-auto md:h-auto"
            bgColor="bg-orange-400"
            textColor="text-white"
            onClick={() => createTask()}
          >
            <Plus /> <span className="hidden md:block">Create new task</span>
          </Button>
          <Button
            className=""
            bgColor="bg-white"
            textColor="text-black"
            onClick={() => signOut()}
          >
            <LogOut /> <span className="hidden md:block">Logout</span>
          </Button>
        </div>
      </div>

      {/* List of taks */}
      <ul className="grid frid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {tasks?.map((task, index) => (
          <TaskCard key={index} task={task} onClick={() => showTask(task)} />
        ))}
      </ul>

      {/* Floating add task button (visible on small screens) */}
      {/* <div className="md:hidden fixed right-3 bottom-3">
        <Button
          className="size-14"
          bgColor="bg-orange-400"
          textColor="text-white"
        >
          <Plus />
        </Button>
      </div> */}

      {/* Modal for create, update and delete task*/}
      <TaskModal
        open={isOpen}
        close={hideModal}
        {...(currentTask && { task: currentTask })}
      />
    </main>
  );
};

export default HomePage;
