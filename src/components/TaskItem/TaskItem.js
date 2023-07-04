import "./TaskItem.css";
import { AiOutlineDelete } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";

const TaskItem = ({ title, description }) => {
  return (
    <>
        <input type="checkbox" />
        <b>{title} </b>
        <br />
        {description}
        <br />
        <button>
          <AiTwotoneEdit />
        </button>{" "}
        <button>
          <AiOutlineDelete />
        </button>
    </>
  );
};

export default TaskItem;
