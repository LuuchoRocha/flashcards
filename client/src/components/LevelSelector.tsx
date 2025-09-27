import {useCallback, useEffect, useState} from 'react';
import WordPartsList from './WordPartsList.tsx';
import {Level} from '../types/Level.ts';
import LevelOptions from './LevelOptions.tsx';
import {getPhonicLevels} from '../api/api.ts';
import ErrorBox from './ErrorBox.tsx';

/** A component that displays a level selector, whose values are loaded from the /phonics_levels endpoint.
 * The current level default to null, and is updated when the user selects a new level.
 * That new level then triggers a fetch to the /phonics_levels/:id/word_parts endpoint, which is used to update the content of the page.
 */
const LevelSelector = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [level, setLevel] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleLevelChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value);
  }, []);

  const fetchLevels = useCallback(() => {
    getPhonicLevels()
      .then((data) => setLevels(data as Level[]))
      .catch((error) => setError(error instanceof Error ? error.message : String(error)));
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    setLevels([]);
    setLevel('');
    fetchLevels();
  }, [fetchLevels]);

  useEffect(() => {
    fetchLevels();
  }, [fetchLevels]);

  return (
    <div className="w-full max-w-4xl mx-auto p-2 space-y-2">
      <div className="p-4 rounded bg-white shadow-lg">
        <h1 className="text-2xl my-4 font-bold">Phonics Level</h1>
        {error ? (
          <ErrorBox error={error} onRetry={handleRetry} />
        ) : (
          <select value={level} onChange={handleLevelChange} className="w-full mb-4 shadow p-1">
            <LevelOptions levels={levels} />
          </select>
        )}
      </div>
      {level && <WordPartsList levelId={Number(level)} />}
    </div>
  );
};

export default LevelSelector;
