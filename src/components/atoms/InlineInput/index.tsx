import React, { useState } from 'react';
import './index.css';
import { DataList } from '../DataList';
import { Option } from '../../../types/utilities';

const DELETE_DELAY = 1000;

export type InlineInputProps = {
  fields: Option[];
  onSelected: (value: Option) => void;
  onRemove?: () => void;
};

export const InlineInput: React.FC<InlineInputProps> = ({ fields, onSelected, onRemove }) => {
  const [value, setValue] = useState('');
  const [backspaceTimestamp, setBackspaceTimestamp] = useState(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedField = fields.find(f => f.value === e.target.value);
    if (selectedField) {
      onSelected(selectedField);
      setValue('');
    } else {
      setValue(e.target.value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Backspace' && onRemove) {
      const now = new Date().getTime();
      if (now - backspaceTimestamp <= DELETE_DELAY) {
        onRemove();
        setBackspaceTimestamp(0);
      } else {
        setBackspaceTimestamp(now);
      }
    }
  };

  return (
    <div className="inline-input-block">
      <input
        className="inline-input"
        type="text"
        placeholder="Add filter"
        list="data-list"
        onChange={onChange}
        value={value}
        id="inline-input"
        onKeyDown={handleKeyDown}
      />
      <DataList options={fields} />
    </div>
  );
};
