import React, { useState } from 'react';
import './index.css';
import { Popup } from '../Popup';
import { FaCaretDown } from 'react-icons/fa';
import { MdRemoveCircle } from 'react-icons/md';
import { ChipItem, Comparator } from '../../../types/typings';
import { getComparatorLabel } from '../../../libs/utils';

export type ChipProps = {
  item: ChipItem;
  onRemove: (alias: string) => void;
  onSelectComparator: (alias: string, comparator: Comparator) => void;
  onChangeValue: (alias: string, value: string) => void;
};

export const Chip: React.FC<ChipProps> = ({ item, onRemove, onSelectComparator, onChangeValue }) => {
  const [popupVisible, setPopupVisible] = useState(true);

  const onOpenChip = () => {
    setPopupVisible(true);
  };

  const onRemoveHandler = (e?: React.MouseEvent<SVGElement>) => {
    e?.preventDefault();
    e?.stopPropagation();

    onRemove(item.alias);
  };

  const onPopupClose = () => {
    setPopupVisible(false);
  };

  const onSelectComparatorHandler = (comparator: Comparator) => {
    onSelectComparator(item.alias, comparator);
  };

  const onChangeValueHandler = (value: string) => {
    onChangeValue(item.alias, value);
  };

  return (
    <div className="chip" onClick={onOpenChip}>
      <div className="chip-content">
        <div className="chip-field">{`${item.name} ${getComparatorLabel(item.selector?.comparator || Comparator.equal)} "${item.selector?.value || '*'}"`}</div>
        <div className="chip-caret">
          <FaCaretDown />
        </div>
        <div className="chip-divider" />
        <div className="chip-remove-button">
          <MdRemoveCircle size={20} onClick={onRemoveHandler} />
        </div>
      </div>

      {popupVisible ? (
        <Popup
          item={item}
          onClose={onPopupClose}
          onRemove={onRemoveHandler}
          onChangeValue={onChangeValueHandler}
          onSelectComparator={onSelectComparatorHandler}
        />
      ) : null}
    </div>
  );
};
