import { FaSpinner, FaTrash } from 'react-icons/fa';
import useTodo from '../hooks/useTodo';

interface Props {
  id: string;
  title: string;
}

const TodoItem = ({ id, title }: Props) => {
  const { isLoadedTodo, removeTodo } = useTodo();

  return (
    <li className="item">
      <span>{title}</span>
      <div className="item-option">
        {!isLoadedTodo ? (
          <button type="button" onClick={() => removeTodo(id)}>
            <FaTrash className="btn-trash" />
          </button>
        ) : (
          <FaSpinner className="spinner" />
        )}
      </div>
    </li>
  );
};

export default TodoItem;
