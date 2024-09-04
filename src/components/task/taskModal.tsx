import Modal from "../modal/modal";
import { Task } from "../../types/task";
import TaskForm from "./taskForm";

interface taskModalProps {
  open: boolean;
  close: Function;
  task?: Task;
}

const TaskModal = (props: taskModalProps) => {
  const { open, close, task } = props;

  return (
    <Modal id="modal" open={open} close={close} title={task ? "Details" : "New Task"} isScroll>
      <TaskForm task={task} closeModal={close} />
    </Modal>
  );
};

export default TaskModal;
