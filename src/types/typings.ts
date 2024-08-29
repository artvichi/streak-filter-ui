export type SalesDataTypesUnion = number | string | Date | null | undefined | string[];
export enum SalesDataTypes {
  string = 'string',
  number = 'number',
  date = 'date',
  listOfStrings = 'listOfStrings',
  //...
}

// having this types might help identifying an item with strict check
export enum SalesDataFields {
  name = 'name',
  stage = 'stage',
  dateOfLastInteraction = 'dateOfLastInteraction',
  patientsReferred = 'patientsReferred',
  contactsAndOrganizations = 'contactsAndOrganizations',
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

// for simplicity skipped , but there can be setup with unions for this type, so if you select type === listOfStrings the value would be string[]

export type SalesDataItemBase = {
  field: SalesDataFields;
  name: string;
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

// export interface DefaultSalesDatum {
//   name: string;
//   stage: SalesStage;
//   dateOfLastInteraction?: Date | null;
//   patientsReferred?: number | null;
//   contactsAndOrganizations?: string[] | null;
// }

// export interface SalesDatum extends DefaultSalesDatum {
//   [key: string]: number | string | Date | string[] | null | undefined;
// }
