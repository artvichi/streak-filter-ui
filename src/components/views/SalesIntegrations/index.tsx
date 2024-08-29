import React from 'react';
import { useGeneratedMockedData } from '../../../hooks/useGeneratedMockedData';
import { Filter } from '../../molecules/Filter';
import './index.css';

const ROWS = 1000;

export const SalesIntegrations: React.FC = () => {
  const mockedData = useGeneratedMockedData(ROWS);

  return (
    <div className="sales-integrations-filter-block">
      <Filter data={mockedData} />
    </div>
  );
};
