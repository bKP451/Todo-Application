import "./TaskItem.css";
import { AiOutlineDelete } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";

const TaskItem = ({ title, description }) => {
  return (
    <div>
      <li className="single-todo-item">
        <input type="checkbox" />
        <b>{title}{" "}</b>
        <br />
        {description}
        <br />
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
