import {FC, useCallback, useEffect, useState} from 'react';
import {WordPart as WordPartType} from '../types/WordPart.ts';
import WordPartDetail from './WordPartDetail.tsx';
import WordPart from './WordPart.tsx';
import {getWordParts, updateWordPart} from '../api/api.ts';
import ErrorBox from './ErrorBox.tsx';
import {Level} from '../types/Level.ts';
import Toast from './Toast.tsx';

interface WordPartsViewProps {
  levelId: Level['id'];
}

const WordPartsList: FC<WordPartsViewProps> = ({levelId}) => {
  const [wordParts, setWordParts] = useState<WordPartType[]>([]);
  const [selectedWordPart, setSelectedWordPart] = useState<WordPartType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);

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

  const updateWordPartLocalState = useCallback((wordPartId: number, status: WordPartType['status']) => {
    setWordParts((prev) => prev.map((wp) => (wp.id === wordPartId ? {...wp, status} : wp)));
    setSelectedWordPart((prev) => (prev?.id === wordPartId ? {...prev, status} : prev));
  }, []);

  const handleStatusChange = useCallback(
    (wordPart: WordPartType, status: WordPartType['status']) => {
      const previousStatus = wordPart.status;

      updateWordPartLocalState(wordPart.id, status);
      updateWordPart(levelId, wordPart.id, {status}).catch(() => {
        updateWordPartLocalState(wordPart.id, previousStatus);
        setUpdateError('Failed to update word part status. Please try again.');
      });
    },
    [levelId, updateWordPartLocalState],
  );

  const handleNeedsWork = useCallback(() => {
    if (selectedWordPart) {
      handleStatusChange(selectedWordPart, 'needs_work');
    }
  }, [handleStatusChange, selectedWordPart]);

  const handleMastered = useCallback(() => {
    if (selectedWordPart) {
      handleStatusChange(selectedWordPart, 'mastered');
    }
  }, [handleStatusChange, selectedWordPart]);

  const handleUpdateErrorClose = useCallback(() => {
    setUpdateError(null);
  }, []);

  useEffect(() => {
    fetchWordParts();
  }, [fetchWordParts]);

  return (
    <div className="p-4 rounded bg-white shadow-lg">
      <h2 className="text-xl mb-4 font-bold">Word Parts</h2>
      {error ? (
        <ErrorBox error={error} onRetry={handleRetry} />
      ) : (
        <>
          <div className="space-x-2">
            {wordParts.map((wordPart) => (
              <WordPart wordPart={wordPart} onClick={handleWordPartClick} key={wordPart.id} />
            ))}
          </div>
          {selectedWordPart && (
            <WordPartDetail wordPart={selectedWordPart} onNeedsWork={handleNeedsWork} onMastered={handleMastered} />
          )}
        </>
      )}
      {updateError && <Toast message={updateError} onClose={handleUpdateErrorClose} />}
    </div>
  );
};

export default WordPartsList;
