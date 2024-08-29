import React from 'react';
import { FaTrash } from 'react-icons/fa';
import './index.css';
import { Select, SelectProps } from '../Select';
import { Input, InputProps } from '../Input';

export type PopupProps = {
  field: string;
  select: SelectProps;
  input: InputProps;
};

export const Popup: React.FC<PopupProps> = ({ field, input, select }) => {
  return (
    <div className="popup">
      <div className="popup-header">
        <div className="popup-header-title">{field}</div>
        <div className="popup-header-delete">
          <FaTrash size={12} />
        </div>
      </div>
      <div className="popup-content">
        <Select {...select} />
        <div className="popup-content-field">
          <Input {...input} />
        </div>
      </div>
    </div>
  );
};
