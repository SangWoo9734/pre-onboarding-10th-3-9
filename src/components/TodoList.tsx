import { TodoType } from '../@types';
import TodoItem from './TodoItem';

interface Props {
  todos: TodoType[];
}

const TodoList = ({ todos }: Props) => {
  return todos.length ? (
    <ul>
      {todos.map(({ id, title }: TodoType) => (
        <TodoItem key={id} id={id} title={title} />
      ))}
    </ul>
  ) : (
    <div className="empty-list">...</div>
  );
};
export default TodoList;
