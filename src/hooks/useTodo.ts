import { useEffect, useState } from 'react';
import { TodoType } from '../@types';
import { createTodo, deleteTodo, getTodoList } from '../api/todo';

const useTodo = () => {
  const [todoListData, setTodoListData] = useState<TodoType[]>([]);
  const [isLoadedTodo, setIsLoadedTodo] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, [setTodoListData]);

  const submitTodo = async (searchWord: string) => {
    try {
      setIsLoadedTodo(false);

      const trimmed = searchWord.trim();
      if (!trimmed) {
        alert('Please write something');
      }

      const newItem = { title: trimmed };
      const { data } = await createTodo(newItem);

      if (data) {
        setTodoListData((prev: TodoType[]) => [...prev, data]);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setIsLoadedTodo(true);
    }
  };
  const removeTodo = async (id: string) => {
    try {
      setIsLoadedTodo(true);
      await deleteTodo(id);

      setTodoListData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setIsLoadedTodo(false);
    }
  };

  return { todoListData, isLoadedTodo, submitTodo, removeTodo };
};

export default useTodo;
