import { Comparator, SalesDataTypes, SalesStage } from '../types/typings';

export const SALES_STAGES = Object.values(SalesStage);

export const DATA_TYPE_COMPARATORS: Record<SalesDataTypes, Comparator[]> = {
  [SalesDataTypes.string]: [Comparator.equal, Comparator.doesNotEqual, Comparator.contains],
  [SalesDataTypes.number]: [Comparator.equal, Comparator.doesNotEqual, Comparator.greaterThan, Comparator.lessThan],
  [SalesDataTypes.date]: [Comparator.equal, Comparator.doesNotEqual, Comparator.greaterThan, Comparator.lessThan],
  [SalesDataTypes.listOfStrings]: [Comparator.contains],
};
