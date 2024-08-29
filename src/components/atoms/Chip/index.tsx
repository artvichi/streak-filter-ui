import React from 'react';
import './index.css';
import { Popup, PopupProps } from '../Popup';
import { FaCaretDown } from 'react-icons/fa';
import { MdRemoveCircle } from 'react-icons/md';

export type ChipProps = {
  field: string;
  value: string;
  comparator: string;
  popup: PopupProps;
};

export const Chip: React.FC<ChipProps> = ({ field, value, comparator, popup }) => {
  return (
    <div className="chip">
      <div className="chip-content">
        <div className="chip-field">{`${field} ${comparator} ${value}`}</div>
        <div className="chip-caret">
          <FaCaretDown />
        </div>
        <div className="chip-divider" />
        <div className="chip-remove-button">
          <MdRemoveCircle size={20} />
        </div>
      </div>

      <Popup {...popup} />
    </div>
  );
};
