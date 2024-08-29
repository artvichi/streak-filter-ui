import React from 'react';
import './index.css';

export type SelectProps = {
  label: string;
  options: { label: string; value: string }[];
};

export const Select: React.FC<SelectProps> = ({ label, options }) => {
  return (
    <div className="select-block">
      <label className="select-label" htmlFor="select">
        {label}
      </label>
      <div className="select-control-block">
        <select className="select" id="select">
          {options.map(o => {
            return <option value={o.value}>{o.label}</option>;
          })}
        </select>
      </div>
    </div>
  );
};
