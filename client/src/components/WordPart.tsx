import {useCallback} from 'react';
import {WordPart as WordPartType} from '../types/WordPart.ts';

const WordPart = ({wordPart, onClick}: {wordPart: WordPartType; onClick: (id: number) => void}) => {
  const handleClick = useCallback(() => onClick(wordPart.id), [onClick, wordPart.id]);

  return (
    <button
      key={wordPart.id}
      type="button"
      className="mr-2 mb-2 px-2 py-1 border rounded hover:bg-gray-200 cursor-pointer"
      onClick={handleClick}>
      {wordPart.label}
    </button>
  );
};

export default WordPart;
