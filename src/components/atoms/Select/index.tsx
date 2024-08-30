import React from 'react';
import './index.css';
import { Option } from '../../../types/utilities';

export type SelectProps = {
  value: string;
  label?: string;
  options: Option[];
  onSelect: (value: string) => void;
  id?: string;
  placeholder?: string;
  size?: 'medium' | 'large';
};

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onSelect,
  id = 'select',
  placeholder = 'Select an option',
  size = 'medium',
}) => {
  const onSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value);
  };

  return (
    <div className="select-block">
      {label ? (
        <label className="select-label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <div
        className={`select-control-block${size === 'large' ? ' select-control-block-large' : ''}`}
        style={size === 'large' ? { marginTop: 0 } : {}}
      >
        <select
          className={`select${size === 'large' ? ' select-large' : ''}`}
          id={id}
          onChange={onSelectHandler}
          value={value}
          tabIndex={0}
        >
          {value === '*' ? (
            <option value={'*'} key="*">
              {placeholder}
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
