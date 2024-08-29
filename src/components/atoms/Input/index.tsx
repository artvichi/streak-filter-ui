import React from 'react';
import './index.css';

export type InputProps = {
  label: string;
  value?: string;
};

export const Input: React.FC<InputProps> = ({ label, value }) => {
  return (
    <div className="input-block">
      <label className="input-label" htmlFor="input">
        {label}
      </label>
      <div className="input-control-block">
        <input className="input" id="input" value={value} />
      </div>
    </div>
  );
};
