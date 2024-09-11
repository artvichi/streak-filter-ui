import React from 'react';
import './index.css';
import { Select } from '../Select';
import { FilterItem, SortItem } from '../../../types/typings';
import { Option } from '../../../types/utilities';

export type SortProps = {
  filters: FilterItem[];
  sort: SortItem | null;
  onChangeSort: (sort: SortItem) => void;
};

export const Sort: React.FC<SortProps> = ({ filters, sort, onChangeSort }) => {
  const options: Option[] = filters
    .map(f => {
      return [
        {
          label: `${f.alias} ascending`,
          value: `${f.alias}_asc`,
        },
        {
          label: `${f.alias} descending`,
          value: `${f.alias}_desc`,
        },
      ];
    })
    .flat();

  const onSelect = (value: string) => {
    const [field, order] = value.split('_');
    onChangeSort({
      field,
      order: order as 'asc' | 'desc',
    });
  };

  return (
    <div className="sort">
      <Select
        placeholder={'Sort'}
        value={sort ? `${sort.field}_${sort.order}` : '*'}
        options={options}
        onSelect={onSelect}
        size="large"
      />
    </div>
  );
};
