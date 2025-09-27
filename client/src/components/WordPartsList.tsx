import {FC, useCallback, useEffect, useState} from 'react';
import {WordPart as WordPartType} from '../types/WordPart.ts';
import WordPartDetail from './WordPartDetail.tsx';
import WordPart from './WordPart.tsx';
import {getWordParts} from '../api/api.ts';
import ErrorBox from './ErrorBox.tsx';

interface WordPartsViewProps {
  levelId: string;
}

const WordPartsList: FC<WordPartsViewProps> = ({levelId}) => {
  const [wordParts, setWordParts] = useState<WordPartType[]>([]);
  const [selectedWordPart, setSelectedWordPart] = useState<WordPartType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWordParts = useCallback(() => {
    getWordParts(levelId)
      .then((data) => setWordParts(data as WordPartType[]))
      .catch((error) => setError(error instanceof Error ? error.message : String(error)));
  }, [levelId]);

  const handleWordPartClick = useCallback(
    (wordPartId: number) => {
      setSelectedWordPart(wordParts.find((wordPart) => wordPart.id === wordPartId) || null);
    },
    [wordParts],
  );

  const handleRetry = useCallback(() => {
    setError(null);
    setWordParts([]);
    setSelectedWordPart(null);
    fetchWordParts();
  }, [fetchWordParts]);

  useEffect(() => {
    fetchWordParts();
  }, [fetchWordParts]);

  const handleNeedsWork = () => {
    // TODO
  };

  const handleMastered = () => {
    // TODO
  };

  return (
    <div className="my-4">
      <h2 className="text-xl mb-4">Word Parts</h2>
      {error ? (
        <ErrorBox error={error} onRetry={handleRetry} />
      ) : (
        <>
          {wordParts.map((wordPart) => (
            <WordPart wordPart={wordPart} onClick={handleWordPartClick} key={wordPart.id} />
          ))}
          <hr />
          {selectedWordPart && (
            <WordPartDetail wordPart={selectedWordPart} onNeedsWork={handleNeedsWork} onMastered={handleMastered} />
          )}
        </>
      )}
    </div>
  );
};

export default WordPartsList;
