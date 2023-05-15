import { TodoType } from '../@types';
import TodoItem from './TodoItem';

interface Props {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const TodoList = ({ todos, setTodos }: Props) => {
  return todos.length ? (
    <ul>
      {todos.map(({ id, title }: TodoType) => (
        <TodoItem key={id} id={id} title={title} setTodos={setTodos} />
      ))}
    </ul>
  ) : (
    <div className="empty-list">...</div>
  );
};
export default TodoList;
