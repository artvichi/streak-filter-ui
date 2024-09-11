import { useMemo } from 'react';
import { SalesDataKind, SalesDataItem, SalesDataRow, SalesDataTypes } from '../types/typings';
import { getRandomArrayElement, getRandomArrayElements, getRandomIntBetween } from '../libs/utils';
import { SALES_STAGES } from '../libs/constnts';
import { MOCKED_EMAILS, MOCKED_FRUITS, MOCKED_LAST_NAMES, MOCKED_NAMES, MOCKED_VEGETABLES } from '../libs/mock-data';
import { DateTime } from 'luxon';

// name: getRandomArrayElement(MOCKED_NAMES) + ' ' + getRandomArrayElement(MOCKED_LAST_NAMES),
// stage: getRandomArrayElement(SALES_STAGES),
// patientsReferred: Math.random() > 0.1 ? getRandomIntBetween(0, 100) : null,
// dateOfLastInteraction: Math.random() > 0.1 ? null : null,
// //...todo add random elements
// contactsAndOrganizations: null,

const getDefaultSalesDataItems = (): SalesDataItem[] => {
  return [
    {
      kind: SalesDataKind.default,
      type: SalesDataTypes.string,
      name: 'Name',
      alias: 'name',
      value: getRandomArrayElement(MOCKED_NAMES) + ' ' + getRandomArrayElement(MOCKED_LAST_NAMES),
    },
    {
      kind: SalesDataKind.default,
      type: SalesDataTypes.string,
      name: 'Stage',
      alias: 'stage',
      value: getRandomArrayElement(SALES_STAGES),
    },
    {
      kind: SalesDataKind.default,
      type: SalesDataTypes.number,
      name: 'Patients Referred',
      alias: 'patientsReferred',
      value: Math.random() > 0.1 ? getRandomIntBetween(0, 100) : null,
    },
    {
      kind: SalesDataKind.default,
      type: SalesDataTypes.date,
      name: 'Date Of Last Interaction',
      alias: 'dateOfLastInteraction',
      value:
        Math.random() > 0.1
          ? DateTime.local()
              .minus({ days: getRandomIntBetween(0, 100) })
              .toJSDate()
          : null,
    },
    {
      kind: SalesDataKind.default,
      name: 'Contacts and Organizations',
      alias: 'contactsAndOrganizations',
      type: SalesDataTypes.listOfStrings,
      value: Math.random() > 0.4 ? getRandomArrayElements(MOCKED_EMAILS, getRandomIntBetween(0, 3)) : null,
    },
  ];
};

const getCustomSalesDataItems = (): SalesDataItem[] => {
  const dataList: SalesDataItem[] = [
    {
      kind: SalesDataKind.custom,
      type: SalesDataTypes.string,
      name: 'Fruit',
      alias: 'fruit',
      value: Math.random() > 0.1 ? getRandomArrayElement(MOCKED_FRUITS) : null,
    },
    {
      kind: SalesDataKind.custom,
      type: SalesDataTypes.string,
      name: 'Vegetables',
      alias: 'vegetables',
      value: Math.random() > 0.1 ? getRandomArrayElement(MOCKED_VEGETABLES) : null,
    },
    {
      kind: SalesDataKind.custom,
      type: SalesDataTypes.number,
      name: 'Goods',
      alias: 'goods',
      value: Math.random() > 0.1 ? getRandomIntBetween(0, 100) : null,
    },
    {
      kind: SalesDataKind.custom,
      type: SalesDataTypes.date,
      name: 'Birthday',
      alias: 'birthday',
      value:
        Math.random() > 0.1
          ? DateTime.local()
              .minus({ years: getRandomIntBetween(20, 60) })
              .toJSDate()
          : null,
    },
  ];

  return dataList;
};

const generateSalesRow = (): SalesDataRow => {
  return {
    items: [...getDefaultSalesDataItems(), ...getCustomSalesDataItems()],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

export const useGeneratedMockedData = (length: number): SalesDataRow[] => {
  const data: SalesDataRow[] = useMemo(() => {
    const dt: SalesDataRow[] = [];

    if (length) {
      for (let i = 0; i < length; i++) {
        dt.push(generateSalesRow());
      }
    }

    return dt;
  }, [length]);

  return data;
};
