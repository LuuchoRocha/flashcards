import {WordPart} from '../types/WordPart';

export const getPhonicLevels = async () => {
  const response = await fetch('/phonics_levels');

  if (!response.ok) {
    throw new Error('Failed to fetch phonics levels');
  }

  return response.json();
};

export const getWordParts = async (levelId: string) => {
  const response = await fetch(`/phonics_levels/${levelId}/word_parts`);

  if (!response.ok) {
    throw new Error('Failed to fetch word parts');
  }

  return response.json();
};

export const updateWordPart = async (levelId: string, wordPartId: string, data: {status: WordPart['status']}) => {
  const response = await fetch(`/phonics_levels/${levelId}/word_parts/${wordPartId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update word part');
  }

  return response.json();
};
