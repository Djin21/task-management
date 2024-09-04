import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ArrowRight, Edit2, Plus, Trash2 } from "lucide-react";
import Button from "../button";
import { Task, TaskNextState } from "../../types/task";
import useTasks from "../../hooks/useTasks";

interface taskFormProps {
  task?: Task;
  closeModal: Function;
}

enum buttonNextStateLabel {
  pending = "Start", // After the creation of the task, we can start it
  during = "Finish", // When the task is on completed state, we go to completed state
  completed = "Restart", // When the task is on completed state, we can restart it
}

const TaskForm = (props: taskFormProps) => {
  const { task, closeModal } = props;
  const { addTask, deleteTask, updateTask } = useTasks();

  // Variable for controlled the current task
  const [currentTask, setCurrentTask] = useState<Task>(
    task ?? ({ title: "", description: "", state: "pending" } as Task)
  );

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setCurrentTask((precCurrentTask) => {
      return {
        ...precCurrentTask,
        [event?.target?.name]: event?.target?.value,
      };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.currentTarget);

    // Get the id of the button that have been clicked for the form submission
    const nativeEvent = event.nativeEvent as SubmitEvent;
    const submittedButton = nativeEvent.submitter;

    switch (submittedButton?.id) {
      case "addTask":
        // Create the new task
        handleAddTask(formData);
        break;
      case "updateGeneralTask":
        // Update the actual task
        handleUpdateTask(formData);
        break;
      case "updateStateTask":
        // Create the new task
        handleUpdateTaskState(formData);
        break;
      default:
        break;
    }

    // Clear all fields
    event.currentTarget.reset();
    setCurrentTask({ title: "", description: "", state: "pending" } as Task)

    // Close the modal
    closeModal();
  }

  function handleDeleteTask() {
    deleteTask(currentTask?.id);

    // Close the modal
    closeModal();
  }

  function handleAddTask(formData: FormData) {
    // Create the new task
    addTask(formData);
  }

  function handleUpdateTask(formData: FormData) {
    // Add other values to the form data
    formData.append("state", currentTask?.state);

    // Update the actual task
    updateTask(task?.id as number, formData);
  }

  function handleUpdateTaskState(formData: FormData) {
    // Get the new state
    const newState = TaskNextState[currentTask?.state];

    // Add other values to the form data
    formData.append("state", newState);

    // Update the actual task
    updateTask(task?.id as number, formData);
  }

  useEffect(() => {
    setCurrentTask(task ?? ({ title: "", description: "" } as Task));
  }, [task]);

  return (
    <form onSubmit={handleSubmit} action="">
      <div>
        <label className="text-sm" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={currentTask?.title}
          onChange={(event) => handleChange(event)}
          className="w-full mb-3 p-3 rounded-md border border-neutral-300"
          required
        />
      </div>
      <div>
        <label className="text-sm" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full p-3 rounded-md border border-neutral-300"
          rows={7}
          value={currentTask?.description}
          onChange={(event) => handleChange(event)}
        ></textarea>
      </div>
      {task ? (
        <div className="flex items-center justify-between gap-x-2 mt-3">
          <Button
            type="submit"
            id="updateStateTask"
            bgColor="bg-green-400 hover:bg-green-500"
            textColor="text-white"
          >
            {buttonNextStateLabel[task?.state]}
            <ArrowRight color="white" size={16} />
          </Button>
          <div className="flex items-center justify-end gap-x-2 ml-auto">
            {task?.state !== "completed" && (
              <Button
                type="submit"
                id="updateGeneralTask"
                bgColor="border border-orange-400 hover:bg-orange-200"
                textColor="text-orange-400"
              >
                <Edit2 className="text-orange-400" size={16} />
                Update
              </Button>
            )}
            <Button
              type="button"
              id="deleteTask"
              bgColor="bg-white hover:bg-neutral-200"
              textColor="text-neutral-700"
              onClick={() => handleDeleteTask()}
            >
              <Trash2 className="text-neutral-700" size={16} />
              Delete
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-end gap-x-2 mt-3">
          <Button
            type="submit"
            bgColor="bg-orange-400"
            textColor="text-white"
            id="addTask"
          >
            <Plus color="white" size={16} />
            Create
          </Button>
        </div>
      )}
    </form>
  );
};

export default TaskForm;
