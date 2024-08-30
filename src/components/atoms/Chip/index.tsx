import React, { useRef, useState } from 'react';
import './index.css';
import { Popup } from '../Popup';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
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
  const chipRef = useRef<HTMLDivElement>(null);

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
    setTimeout(() => {
      const inlineInput = document.querySelector('#inline-input');
      if (item.selector?.comparator && item.selector.value && inlineInput) {
        (inlineInput as HTMLInputElement)?.focus();
      } else {
        chipRef.current?.focus();
      }
    }, 100);
  };

  const onSelectComparatorHandler = (comparator: Comparator) => {
    onSelectComparator(item.alias, comparator);
  };

  const onChangeValueHandler = (value: string) => {
    onChangeValue(item.alias, value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onOpenChip();
    } else if (event.key === 'Backspace') {
      onRemove(item.alias);
    }
  };

  return (
    <div className="chip" onClick={onOpenChip} tabIndex={0} onKeyDown={handleKeyDown} ref={chipRef}>
      <div className="chip-content">
        <div className="chip-field">{`${item.name} ${getComparatorLabel(item.selector?.comparator || Comparator.equal)} "${item.selector?.value || '*'}"`}</div>
        <div className="chip-caret">{popupVisible ? <FaCaretDown /> : <FaCaretUp />}</div>
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
