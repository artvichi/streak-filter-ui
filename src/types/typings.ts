export type SalesDataTypesUnion = number | string | Date | null | undefined | string[];
export enum SalesDataTypes {
  string = 'string',
  number = 'number',
  date = 'date',
  listOfStrings = 'listOfStrings',
  //...
}

// having this types might help identifying an item with strict check
export enum SalesDataKind {
  default = 'default',
  custom = 'custom',
}

export enum SalesStage {
  lead = 'lead',
  contacted = 'contacted',
  demo = 'demo',
  closedWon = 'closedWon',
  closedLost = 'closedLost',
  negotiating = 'negotiating',
}

export type SalesDataItemBase = {
  kind: SalesDataKind; // this one to define system versus custom with additional customization
  name: string;
  alias: string;
};

export type SalesDataItem =
  | (SalesDataItemBase & {
      type: SalesDataTypes.date;
      value?: Date | null | undefined;
    })
  | (SalesDataItemBase & {
      type: SalesDataTypes.string;
      value?: string | null | undefined;
    })
  | (SalesDataItemBase & {
      type: SalesDataTypes.number;
      value?: number | null | undefined;
    })
  | (SalesDataItemBase & {
      type: SalesDataTypes.listOfStrings;
      value?: string[] | null | undefined;
    });

export interface SalesDataRow {
  items: SalesDataItem[];
  createdAt: Date;
  updatedAt: Date;
}

export enum Comparator {
  equal = 'equal',
  contains = 'contains',
  doesNotEqual = 'doesNotEqual',
  greaterThan = 'greaterThan',
  lessThan = 'lessThan',
  //...
}

export type ChipItem = SalesDataItem & { selector?: { comparator?: Comparator; value?: string } };

export interface FilterItem {
  comparator: Comparator;
  value: string;
  alias: string;
}

export interface SortItem {
  field: string;
  order: 'asc' | 'desc';
}
