import '../style/InputTodo.css';

import { FaPlusCircle, FaSpinner } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';

import { createTodo } from '../api/todo';
import useFocus from '../hooks/useFocus';
import { TodoType } from '../@types';
import AutoComplete from './AutoComplete';

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const InputTodo = ({ setTodos }: Props) => {
  const [inputText, setInputText] = useState('');
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, setFocus } = useFocus();

  // auto-complete
  const [isShowAutoCompleteList, setIsShowAutoCompleteList] = useState<boolean>(false);

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const handleSubmit = useCallback(
    // eslint-disable-next-line consistent-return
    async (e: React.FormEvent<HTMLFormElement>) => {
      console.log(111);
      try {
        e.preventDefault();
        setIsLoading(true);

        const trimmed = inputText.trim();
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
        setInputText('');
        setIsLoading(false);
      }
    },
    [inputText, setTodos],
  );

  return (
    <div className="input-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          className="input-text"
          placeholder="Add new todo..."
          ref={ref}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
        />
        {!isLoading ? (
          <button className="input-submit" type="submit">
            <FaPlusCircle className="btn-plus" />
          </button>
        ) : (
          <FaSpinner className="spinner" />
        )}
      </form>
      {inputText.length > 0 && (
        <AutoComplete
          searchWord={inputText}
          setSearchWord={setInputText}
          isAutoCompleteOpen={isAutoCompleteOpen}
          setIsAutoCompleteOpen={setIsAutoCompleteOpen}
        />
      )}
    </div>
  );
};

export default InputTodo;
