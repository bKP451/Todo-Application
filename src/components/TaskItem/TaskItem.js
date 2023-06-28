import "./TaskItem.css";
import { AiOutlineDelete } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";

const TaskItem = ({ title }) => {
  return (
    <div>
      <li className="single-todo-item">
        <input type="checkbox" />
        {title}{" "}
        <button>
          <AiTwotoneEdit />
        </button>{" "}
        <button>
          <AiOutlineDelete />
        </button>
      </li>
    </div>
  );
};

export default TaskItem;
