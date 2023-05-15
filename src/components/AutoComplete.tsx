import { RxDotsHorizontal } from 'react-icons/rx';
import { useSearchDispatch, useSearchState } from '../context/SearchContext';
import AutoCompleteItem from './AutoCompleteItem';

import '../style/AutoComplete.css';

const AutoComplete = () => {
  const { userInput, autoCompleteIndex, autoCompleteWordList, autoCompleteIsOpen, isLoading } =
    useSearchState();

  return (
    <div>
      {userInput.length > 0 && autoCompleteIsOpen && (
        <ul className="auto-complete-container">
          {autoCompleteWordList.length > 0 ? (
            autoCompleteWordList.map((searchResult: string, index: number) => {
              return (
                <AutoCompleteItem
                  key={searchResult}
                  itemIndex={index}
                  text={searchResult}
                  isFocus={autoCompleteIndex === index}
                />
              );
            })
          ) : (
            <p>No Result...</p>
          )}
        </ul>
      )}
      {isLoading && <RxDotsHorizontal />}
    </div>
  );
};

export default AutoComplete;
