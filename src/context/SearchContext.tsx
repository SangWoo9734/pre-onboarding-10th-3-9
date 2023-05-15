import { createContext, useContext, useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { DEBOUNCE_DELAY_IN_MS } from '../utils/const';
import useAutoComplete from '../hooks/useAutoComplete';

interface SearchStateType {
  userInput: string;
  autoCompleteWordList: string[];
  autoCompleteIndex: number;
  autoCompleteIsOpen: boolean;
  isLoading: boolean;
}

interface SearchDispatchType {
  onChangeUserInput: (searchingWord: string) => void;
  onActivateAutoCompleteItem: (itemIndex: number) => void;
  changeLoading: (loadingState: boolean) => void;
}

const SearchContext = createContext<SearchStateType | null>(null);
const SearchDispatchContext = createContext<SearchDispatchType | null>(null);

export const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { autoCompleteWordList, autoCompleteIsOpen, updateAutoCompleteWordList } =
    useAutoComplete();
  const [userInput, setUserInput] = useState<string>('');
  const [autoCompleteIndex, setAutoCompleteIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const debouncedWord = useDebounce<string>(userInput.trim(), DEBOUNCE_DELAY_IN_MS);

  useEffect(() => {
    setIsLoading(true);
    (async () => updateAutoCompleteWordList(debouncedWord))();
    setIsLoading(false);
  }, [debouncedWord]);

  const onChangeUserInput = (searchingWord: string) => {
    setUserInput(searchingWord);
    setAutoCompleteIndex(-1);
  };

  const onActivateAutoCompleteItem = (itemIndex: number) => {
    setAutoCompleteIndex(itemIndex);
  };
  const changeLoading = (loadingState: boolean) => {
    setIsLoading(loadingState);
  };

  return (
    <SearchContext.Provider
      value={{ userInput, autoCompleteWordList, autoCompleteIndex, autoCompleteIsOpen, isLoading }}
    >
      <SearchDispatchContext.Provider
        value={{
          onChangeUserInput,
          onActivateAutoCompleteItem,
          changeLoading,
        }}
      >
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
};

export const useSearchState = () => {
  const state = useContext(SearchContext);
  if (!state) {
    throw new Error('SearchContextProvider not found');
  }
  return state;
};

export const useSearchDispatch = () => {
  const dispatch = useContext(SearchDispatchContext);
  if (!dispatch) {
    throw new Error('SearchContextProvider not found');
  }
  return dispatch;
};
