import React from 'react';
import './index.css';
import { Option } from '../../../types/utilities';

export type SelectProps = {
  value: string;
  label: string;
  options: Option[];
  onSelect: (value: string) => void;
};

export const Select: React.FC<SelectProps> = ({ label, options, value, onSelect }) => {
  const onSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value);
  };

  return (
    <div className="select-block">
      <label className="select-label" htmlFor="select">
        {label}
      </label>
      <div className="select-control-block">
        <select className="select" id="select" onChange={onSelectHandler} value={value} tabIndex={0}>
          {value === '*' ? (
            <option value={'*'} key="*">
              Select an option
            </option>
          ) : null}
          {options.map(o => {
            return (
              <option value={o.value} key={o.value}>
                {o.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
