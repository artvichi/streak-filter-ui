import React from 'react';

export type ListItemProps = {
  name: string;
  value: string;
  separator?: string;
  highlighted?: boolean;
};

const ListItemRaw: React.FC<ListItemProps> = ({ name, value, separator, highlighted }) => {
  return (
    <span className={highlighted ? 'highlighted-list-item-data' : 'list-item-data'}>
      [{name}]:
      {value}
      {separator}
    </span>
  );
};

export const ListItem = React.memo(ListItemRaw);
