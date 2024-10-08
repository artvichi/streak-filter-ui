import React, { useEffect, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';
import './index.css';
import { Select } from '../Select';
import { Input } from '../Input';
import { ChipItem, Comparator } from '../../../types/typings';
import { ClickOutsideCatcher } from '../../utils/OnClickOutside';
import { DATA_TYPE_COMPARATORS } from '../../../libs/constnts';
import { Option } from '../../../types/utilities';
import { getComparatorLabel } from '../../../libs/utils';

export type PopupProps = {
  item: ChipItem;
  onRemove: () => void;
  onClose: () => void;
  onSelectComparator: (comparator: Comparator) => void;
  onChangeValue: (value: string) => void;
};

export const Popup: React.FC<PopupProps> = ({ item, onRemove, onClose, onSelectComparator, onChangeValue }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  const comparators = DATA_TYPE_COMPARATORS[item.type];
  const comparatorOptions: Option[] = comparators.map(c => {
    return {
      label: `${c} (${getComparatorLabel(c)})`,
      value: c,
    };
  });

  const onSelectComparatorHandler = (value: string) => {
    onSelectComparator(value as Comparator);
  };

  const onChangeInputValueHandler = (value: string) => {
    onChangeValue(value);
  };

  useEffect(() => {
    const tid = setTimeout(() => {
      popupRef.current?.focus();
    }, 150);

    return () => {
      clearTimeout(tid);
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
    if (event.key === 'Backspace') {
      onRemove()
    }
  };

  const onBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const relatedTarget = event.relatedTarget;

    if (relatedTarget === null || !popupRef.current?.contains(relatedTarget as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="popup"
      ref={popupRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      onKeyDown={handleKeyDown}
      onBlur={onBlur}
    >
      <ClickOutsideCatcher onClickOutside={onClose}>
        <div className="popup-header">
          <div className="popup-header-title">{item.alias}</div>
          <div className="popup-header-delete" onClick={onRemove}>
            <FaTrash size={12} />
          </div>
        </div>
        <div className="popup-content">
          <Select
            label="Comparator"
            options={comparatorOptions}
            value={item.selector?.comparator || '*'}
            onSelect={onSelectComparatorHandler}
          />
          <div className="popup-content-field">
            <Input
              label="Value"
              onChange={onChangeInputValueHandler}
              value={item.selector?.value || ''}
              onClose={onClose}
            />
          </div>
        </div>
      </ClickOutsideCatcher>
    </div>
  );
};
