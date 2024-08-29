import { useMemo } from 'react';
import { SalesDataFields, SalesDataItem, SalesDataRow, SalesDataTypes } from '../types/typings';
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
      field: SalesDataFields.name,
      type: SalesDataTypes.string,
      name: 'Name',
      value: getRandomArrayElement(MOCKED_NAMES) + ' ' + getRandomArrayElement(MOCKED_LAST_NAMES),
    },
    {
      field: SalesDataFields.stage,
      type: SalesDataTypes.string,
      name: 'Stage',
      value: getRandomArrayElement(SALES_STAGES),
    },
    {
      field: SalesDataFields.patientsReferred,
      type: SalesDataTypes.number,
      name: 'Patients Referred',
      value: Math.random() > 0.1 ? getRandomIntBetween(0, 100) : null,
    },
    {
      field: SalesDataFields.dateOfLastInteraction,
      type: SalesDataTypes.date,
      name: 'Date Of Last Interaction',
      value:
        Math.random() > 0.1
          ? DateTime.local()
              .minus({ days: getRandomIntBetween(0, 100) })
              .toJSDate()
          : null,
    },
    {
      field: SalesDataFields.contactsAndOrganizations,
      name: 'Contacts and Organizations',
      type: SalesDataTypes.listOfStrings,
      value: Math.random() > 0.4 ? getRandomArrayElements(MOCKED_EMAILS, getRandomIntBetween(0, 3)) : null,
    },
  ];
};

const getCustomSalesDataItems = (): SalesDataItem[] => {
  const dataList: SalesDataItem[] = [
    {
      field: SalesDataFields.custom,
      type: SalesDataTypes.string,
      name: 'Fruit',
      value: Math.random() > 0.1 ? getRandomArrayElement(MOCKED_FRUITS) : null,
    },
    {
      field: SalesDataFields.custom,
      type: SalesDataTypes.string,
      name: 'Vegetables',
      value: Math.random() > 0.1 ? getRandomArrayElement(MOCKED_VEGETABLES) : null,
    },
    {
      field: SalesDataFields.custom,
      type: SalesDataTypes.number,
      name: 'Goods',
      value: Math.random() > 0.1 ? getRandomIntBetween(0, 100) : null,
    },
    {
      field: SalesDataFields.custom,
      type: SalesDataTypes.date,
      name: 'Birthday',
      value:
        Math.random() > 0.1
          ? DateTime.local()
              .minus({ years: getRandomIntBetween(20, 60) })
              .toJSDate()
          : null,
    },
  ];

  return getRandomArrayElements(dataList, getRandomIntBetween(0, dataList.length - 1));
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
