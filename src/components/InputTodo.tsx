import '../style/InputTodo.css';

import { FaPlusCircle } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { ImSpinner8 } from 'react-icons/im';

import { useCallback, useEffect } from 'react';

import useFocus from '../hooks/useFocus';
import AutoComplete from './AutoComplete';
import { useSearchDispatch, useSearchState } from '../context/SearchContext';
import useTodo from '../hooks/useTodo';

const InputTodo = () => {
  const { userInput, isLoading } = useSearchState();
  const { onChangeUserInput } = useSearchDispatch();

  const { submitTodo } = useTodo();
  const { ref, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      submitTodo(userInput);
    },
    [userInput],
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
