import React from 'react';
import './index.css';
import { DataList } from '../DataList';

export const InlineInput: React.FC = () => {
  return (
    <div className="inline-input-block">
      <input className="inline-input" type="text" placeholder="Add filter" list="data-list" />
      <DataList />
    </div>
  );
};
