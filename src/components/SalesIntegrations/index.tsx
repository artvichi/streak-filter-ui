import { useGeneratedMockedData } from '../../hooks/useGeneratedMockedData';

const ROWS = 1000;

export const SalesIntegrations: React.FC = () => {
  const mockedData = useGeneratedMockedData(ROWS);

  return <div>{mockedData.length}</div>;
};
