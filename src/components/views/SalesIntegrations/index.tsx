import React, { useCallback, useMemo, useState } from 'react';
import { useGeneratedMockedData } from '../../../hooks/useGeneratedMockedData';
import { Filter } from '../../molecules/Filter';
import './index.css';
import { Comparator, FilterItem, SalesDataTypes, SortItem } from '../../../types/typings';
import { Sort } from '../../atoms/Sort';
import { ListItem } from '../../atoms/ListItem';

const ROWS = 1000;

export const SalesIntegrations: React.FC = () => {
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const [sort, setSort] = useState<SortItem | null>(null);

  const mockedData = useGeneratedMockedData(ROWS);

  const onChangeFilters = useCallback((newFilters: FilterItem[]) => {
    setFilters(newFilters);
  }, []);

  const filteredSortedData = useMemo(() => {
    const filteredData = filters.length
      ? mockedData
          .filter(md => {
            return (
              md.items.filter(i => {
                const filter = filters.find(f => f.alias === i.alias);

                if (filter) {
                  if (i.value === null || typeof i.value === 'undefined') {
                    return false;
                  }
                  // logic simplified for different types of data - string / number / date / array would be casted to strings and compared

                  let filterValue: string | number = filter.value.toLowerCase();
                  let dataValue: string | number = `${i.value}`.toLowerCase();

                  if (i.type === SalesDataTypes.number) {
                    filterValue = parseInt(filter.value);
                    dataValue = parseInt(`${i.value}` as string);
                  }
                  switch (filter.comparator) {
                    case Comparator.equal:
                      return filterValue === dataValue;
                    case Comparator.lessThan:
                      return filterValue > dataValue;
                    case Comparator.greaterThan:
                      return filterValue < dataValue;
                    case Comparator.contains:
                      return `${dataValue}`.includes(`${filterValue}`);
                    case Comparator.doesNotEqual:
                      return filterValue !== dataValue;
                  }
                }

                return true;
              }).length === md.items.length
            );
          })
          .map(d => {
            return {
              ...d,
              items: d.items.map(i => ({ data: i, filter: filters.find(f => f.alias === i.alias) })),
            };
          })
      : [];

    if (sort) {
      return filteredData.sort((a, b) => {
        const itemA = a.items.find(i => i.data.alias === sort.field);
        const itemB = b.items.find(i => i.data.alias === sort.field);

        if (itemA?.data?.value && !itemB?.data?.value) {
          return sort.order === 'asc' ? 1 : -1;
        }

        if (itemB?.data?.value && !itemA?.data?.value) {
          return sort.order === 'asc' ? -1 : 1;
        }

        if (itemA?.data?.value && itemB?.data?.value) {
          if (itemA.data.value > itemB.data.value) {
            return sort.order === 'asc' ? 1 : -1;
          }

          if (itemA.data.value < itemB.data.value) {
            return sort.order === 'asc' ? -1 : 1;
          }
        }

        return 0;
      });
    }

    return filteredData;
  }, [filters, mockedData, sort]);

  return (
    <div className="sales-integrations-filter-block">
      <div className="sales-integrations-filter-block-header">
        <div className="sales-integrations-filter">
          <Filter data={mockedData} onChangeFilters={onChangeFilters} />
        </div>
        {filters.length ? (
          <div className="sales-integrations-sort">
            <Sort filters={filters} sort={sort} onChangeSort={setSort} />
          </div>
        ) : null}
      </div>

      <div className="list-block-label">
        Found {filteredSortedData.length} results, from total {mockedData.length} rows
      </div>
      {filteredSortedData.length ? (
        <div className="list-block">
          {filteredSortedData.map((d, i) => {
            // TODO for further optimization extract to separate component with React.memo
            return (
              <div className="list-item" key={`${d.createdAt.toString()}_${d.toString()}_${i}`}>
                {i + 1}. &nbsp;
                {d.items.map((i, index, arr) => {
                  if (typeof i.data.value === 'undefined' || i.data.value === null) {
                    return null;
                  }

                  return (
                    <ListItem
                      key={`${i.data.value}_${index}`}
                      highlighted={!!i.filter}
                      name={i.data.name}
                      value={i.data.value instanceof Date ? i.data.value.toString() : `"${i.data.value}"`}
                      separator={index < arr.length - 1 ? ', ' : ''}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : filters.length === 0 ? (
        <div className="list-block">
          {mockedData.map((d, i) => {
            // TODO for further optimization extract to separate component with React.memo
            return (
              <div className="list-item" key={`${d.createdAt.toString()}_${d.toString()}_${i}`}>
                {i + 1}. &nbsp;
                {d.items.map((i, index, arr) => {
                  if (typeof i.value === 'undefined' || i.value === null) {
                    return null;
                  }

                  return (
                    <ListItem
                      key={`${i.value}_${index}`}
                      name={i.name}
                      value={i.value instanceof Date ? i.value.toString() : `"${i.value}"`}
                      separator={index < arr.length - 1 ? ', ' : ''}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
