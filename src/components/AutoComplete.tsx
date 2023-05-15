import { useEffect, useState } from 'react';
import '../style/AutoComplete.css';
import AutoCompleteItem from './AutoCompleteItem';
import { getSearchWordList } from '../api/search';
import useSearchIndex from '../hooks/useSearchIndex';

interface Props {
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  isAutoCompleteOpen: boolean;
  setIsAutoCompleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AutoComplete = ({
  searchWord,
  setSearchWord,
  isAutoCompleteOpen,
  setIsAutoCompleteOpen,
}: Props) => {
  const { currentIndex, changeIndex, initIndex } = useSearchIndex();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchWordList, setSearchWordList] = useState<string[]>([]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { data } = await getSearchWordList({ q: searchWord });
      setSearchWordList(data.result);
      setIsAutoCompleteOpen(true);
    })();
    setIsLoading(false);
  }, [searchWord]);

  return (
    <div>
      {isAutoCompleteOpen && (
        <ul className="auto-complete-container">
          {searchWordList.length > 0 &&
            searchWordList.map((searchResult: string, index: number) => {
              return (
                <AutoCompleteItem
                  key={searchResult}
                  text={searchResult}
                  searchWord={searchWord}
                  isFocus={currentIndex === index}
                  onMouseOverItem={() => changeIndex(index)}
                  onMouseLeaveItem={() => initIndex()}
                  onClickItem={() => {
                    setSearchWord(searchResult);
                    setIsAutoCompleteOpen(false);
                  }}
                />
              );
            })}
          {isLoading && <div>Loading...</div>}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
