import React from 'react';
import './index.css';
import { Option } from '../../../types/utilities';

export type DataListProps = {
  options: Option[];
};

export const DataList: React.FC<DataListProps> = ({ options }) => {
  return (
    <datalist id="data-list">
      {options.map(o => {
        return (
          <option value={o.value} key={o.value}>
            {o.label}
          </option>
        );
      })}
    </datalist>
  );
};
