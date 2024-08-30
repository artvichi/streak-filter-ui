import React, { useCallback, useMemo, useState } from 'react';
import { useGeneratedMockedData } from '../../../hooks/useGeneratedMockedData';
import { Filter } from '../../molecules/Filter';
import './index.css';
import { Comparator, FilterItem } from '../../../types/typings';

const ROWS = 1000;

export const SalesIntegrations: React.FC = () => {
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const mockedData = useGeneratedMockedData(ROWS);

  const onChangeFilters = useCallback((newFilters: FilterItem[]) => {
    setFilters(newFilters);
  }, []);

  const filteredData = useMemo(() => {
    return filters.length
      ? mockedData
          .filter(md => {
            return (
              md.items.filter(i => {
                const filter = filters.find(f => f.alias === i.alias);

                if (filter) {
                  if (i.value === null) {
                    return false;
                  }
                  // logic simplified for different types of data - string / number / date / array would be casted to strings and compared
                  switch (filter.comparator) {
                    case Comparator.equal:
                      return filter.value.toLowerCase() === `${i.value}`.toLowerCase();
                    case Comparator.lessThan:
                      return filter.value.toLowerCase() > `${i.value}`.toLowerCase();
                    case Comparator.greaterThan:
                      return filter.value.toLowerCase() < `${i.value}`.toLowerCase();
                    case Comparator.contains:
                      return `${i.value}`.toLowerCase().includes(filter.value.toLowerCase());
                    case Comparator.doesNotEqual:
                      return filter.value.toLowerCase() !== `${i.value}`.toLowerCase();
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
  }, [filters, mockedData]);

  return (
    <div className="sales-integrations-filter-block">
      <Filter data={mockedData} onChangeFilters={onChangeFilters} />
      <div className="list-block-label">
        Found {filteredData.length} results, from total {mockedData.length} rows
      </div>
      {filteredData.length ? (
        <div className="list-block">
          {filteredData.map((d, i) => {
            return (
              <div className="list-item" key={`${d.createdAt.toString()}_${d.toString()}_${i}`}>
                {i + 1}. &nbsp;
                {d.items.map((i, index, arr) => {
                  if (!i.data.value) {
                    return null;
                  }
                  return (
                    <span
                      key={`${i.data.value}_${index}`}
                      className={i.filter ? 'highlighted-list-item-data' : 'list-item-data'}
                    >
                      [{i.data.name}]:
                      {i.data.value instanceof Date ? i.data.value.toString() : i.data.value}
                      {index < arr.length - 1 ? ', ' : ''}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="list-block">
          {mockedData.map((d, i) => {
            return (
              <div className="list-item" key={`${d.createdAt.toString()}_${d.toString()}_${i}`}>
                {i + 1}. &nbsp;
                {d.items.map((i, index, arr) => {
                  if (!i.value) {
                    return null;
                  }
                  return (
                    <span key={`${i.value}_${index}`} className={'list-item-data'}>
                      [{i.name}]:
                      {i.value instanceof Date ? i.value.toString() : i.value}
                      {index < arr.length - 1 ? ', ' : ''}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
