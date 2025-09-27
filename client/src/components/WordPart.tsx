import {useCallback} from 'react';
import {WordPart as WordPartType} from '../types/WordPart.ts';

const BASE_CLASSES = 'px-2 py-1 border rounded hover:bg-gray-200 cursor-pointer transition-colors';

const getClassesForStatus = (status: WordPartType['status']) => {
  if (status === 'mastered') {
    return 'bg-green-100 border-green-400';
  } else if (status === 'needs_work') {
    return 'bg-red-100 border-red-400';
  } else {
    return '';
  }
};

const WordPart: React.FC<{wordPart: WordPartType; onClick: (id: number) => void}> = ({wordPart, onClick}) => {
  const handleClick = useCallback(() => onClick(wordPart.id), [onClick, wordPart.id]);

  return (
    <button
      key={wordPart.id}
      type="button"
      role="button"
      className={`${BASE_CLASSES} ${getClassesForStatus(wordPart.status)}`}
      onClick={handleClick}>
      {wordPart.label}
    </button>
  );
};

export default WordPart;
