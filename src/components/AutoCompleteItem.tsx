import { useState } from 'react';
import '../style/AutoCompleteItem.css';
import { useSearchDispatch, useSearchState } from '../context/SearchContext';

interface Props {
  itemIndex: number;
  text: string;
  isFocus: boolean;
}

const AutoCompleteItem = ({ text, isFocus, itemIndex }: Props) => {
  const { userInput } = useSearchState();
  const { onChangeUserInput, onActivateAutoCompleteItem } = useSearchDispatch();
  const [isActive, setIsActive] = useState<boolean>(false);

  const highlightedWord = () => {
    const slicedText: string[] = text.split(userInput);

    return (
      <span>
        {slicedText.map((word, index) => {
          return (
            <span key={word}>
              {index !== 0 && <span className="highlighted">{userInput}</span>}
              {word}
            </span>
          );
        })}
      </span>
    );
  };

  const triggerSearchWord = () => {
    if (isActive) onChangeUserInput(text);
    setIsActive(!isActive);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      className={`auto-complete-item ${isFocus ? 'focused-item' : ''} ${
        isActive ? 'actived-item' : ''
      }`}
      onMouseOver={() => onActivateAutoCompleteItem(itemIndex)}
      onMouseLeave={() => onActivateAutoCompleteItem(itemIndex)}
      onMouseDown={triggerSearchWord}
      onMouseUp={triggerSearchWord}
      onKeyDown={triggerSearchWord}
      onFocus={() => {
        onActivateAutoCompleteItem(itemIndex);
      }}
    >
      {highlightedWord()}
    </li>
  );
};

export default AutoCompleteItem;
