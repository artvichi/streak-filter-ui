import React from 'react';
import { SalesDataRow } from '../../../types/typings';
import './index.css';
import { Chip } from '../../atoms/Chip';
import { InlineInput } from '../../atoms/InlineInput';

export const Filter: React.FC<{ data: SalesDataRow[] }> = ({ data }) => {
  return (
    <div className="filter-container">
      <div className="filter-label-block">Filter</div>
      <div className="filter-input-block">
        {/* <Chip /> */}
        <InlineInput />
      </div>
    </div>
  );
};
