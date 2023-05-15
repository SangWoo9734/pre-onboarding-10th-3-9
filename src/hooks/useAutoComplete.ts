import { useState } from 'react';
import { getSearchWordList } from '../api/search';

const useAutoComplete = () => {
  const [autoCompleteWordList, setAutoCompleteWordList] = useState<string[]>([]);
  const [autoCompleteIsOpen, setAutoCompleteIsOpen] = useState<boolean>(false);

  const clearAutoCompleteWordList = () => setAutoCompleteWordList([]);

  const updateAutoCompleteWordList = async (searchWord: string) => {
    if (searchWord === '') {
      clearAutoCompleteWordList();
      setAutoCompleteIsOpen(false);
    } else {
      const { data } = await getSearchWordList({ q: searchWord });
      setAutoCompleteWordList(data.result);
      setAutoCompleteIsOpen(true);
    }
  };

  return { autoCompleteWordList, autoCompleteIsOpen, updateAutoCompleteWordList };
};

export default useAutoComplete;
