import { Comparator } from '../types/typings';

export const getRandomArrayElement = <T = unknown>(arr: T[]): T => {
  return arr[getRandomIntBetween(0, arr.length - 1)];
};

// min and max included
export const getRandomIntBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomArrayElements = <T = unknown>(arr: T[], count: number): T[] => {
  if (arr.length < count) {
    throw new Error('getRandomArrayElements count provided bigger than array length');
  }

  const indexes = new Array(arr.length).fill(1).map((__, i) => i);

  const randomIndexes: number[] = [];

  for (let i = 0; i < count; i++) {
    const availableIndexes: number[] = indexes
      .map((d, i) => (randomIndexes.includes(i) ? undefined : d))
      .filter(f => typeof f !== 'undefined') as number[];
    const randomIndex = getRandomArrayElement<number>(availableIndexes);
    randomIndexes.push(randomIndex);
  }

  return randomIndexes.map(ri => arr[ri]);
};

export const getComparatorLabel = (comparator: Comparator): string => {
  switch (comparator) {
    case Comparator.equal:
      return '=';
    case Comparator.doesNotEqual:
      return '!=';
    case Comparator.contains:
      return '[]';
    case Comparator.greaterThan:
      return '>';
    case Comparator.lessThan:
      return '<';
    default:
      return '';
  }
};
