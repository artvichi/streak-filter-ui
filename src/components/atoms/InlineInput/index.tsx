import React, { useState } from 'react';
import './index.css';
import { DataList } from '../DataList';
import { Option } from '../../../types/utilities';

export type InlineInputProps = {
  fields: Option[];
  onSelected: (value: Option) => void;
};

export const InlineInput: React.FC<InlineInputProps> = ({ fields, onSelected }) => {
  const [value, setValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedField = fields.find(f => f.value === e.target.value);
    if (selectedField) {
      onSelected(selectedField);
      setValue('');
    } else {
      setValue(e.target.value);
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
      />
      <DataList options={fields} />
    </div>
  );
};
