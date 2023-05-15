import { useState } from 'react';
import '../style/AutoCompleteItem.css';

interface Props {
  text: string;
  searchWord: string;
  isFocus: boolean;
  onMouseOverItem: () => void;
  onMouseLeaveItem: () => void;
  onClickItem: () => void;
}

const AutoCompleteItem = ({
  text,
  searchWord,
  isFocus,
  onMouseOverItem,
  onMouseLeaveItem,
  onClickItem,
}: Props) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const highlightedWord = () => {
    const slicedText: string[] = text.split(searchWord);

    return (
      <span>
        {slicedText.map((word, index) => {
          return (
            <span key={word}>
              {index !== 0 && <span className="highlighted">{searchWord}</span>}
              {word}
            </span>
          );
        })}
      </span>
    );
  };

  const activeSearchWord = () => {
    onClickItem();
    setIsActive(true);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      className={`auto-complete-item ${isFocus ? 'focused-item' : ''} ${
        isActive ? 'actived-item' : ''
      }`}
      onMouseEnter={onMouseOverItem}
      onMouseLeave={onMouseLeaveItem}
      onKeyDown={activeSearchWord}
      onClick={activeSearchWord}
    >
      {highlightedWord()}
    </li>
  );
};

export default AutoCompleteItem;
