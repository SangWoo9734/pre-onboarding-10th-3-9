import '../style/InputTodo.css';

import { FaPlusCircle } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { ImSpinner8 } from 'react-icons/im';

import { useCallback, useEffect } from 'react';

import { createTodo } from '../api/todo';
import useFocus from '../hooks/useFocus';
import { TodoType } from '../@types';
import AutoComplete from './AutoComplete';
import { useSearchDispatch, useSearchState } from '../context/SearchContext';

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const InputTodo = ({ setTodos }: Props) => {
  const { userInput, autoCompleteIsOpen, isLoading } = useSearchState();
  const { onChangeUserInput, changeLoading } = useSearchDispatch();

  const { ref, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const handleSubmit = useCallback(
    // eslint-disable-next-line consistent-return
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        changeLoading(true);

        const trimmed = userInput.trim();
        if (!trimmed) {
          return alert('Please write something');
        }

        const newItem = { title: trimmed };
        const { data } = await createTodo(newItem);

        if (data) {
          setTodos((prev: TodoType[]) => [...prev, data]);
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        onChangeUserInput('');
        changeLoading(false);
      }
    },
    [userInput, setTodos],
  );

  return (
    <div className="input-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <BiSearch className="input-icon" />
        <input
          className="input-text"
          placeholder="Add new todo..."
          ref={ref}
          value={userInput}
          onChange={(e) => onChangeUserInput(e.target.value)}
          disabled={isLoading}
        />

        {!isLoading ? (
          <button className="input-submit" type="submit">
            <FaPlusCircle className="btn-plus" />
          </button>
        ) : (
          <ImSpinner8 className="input-icon spinner" />
        )}
      </form>
      <AutoComplete />
    </div>
  );
};

export default InputTodo;
