import React from 'react';
import './index.css';

export type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onClose?: () => void;
};

export const Input: React.FC<InputProps> = ({ label, value, onChange, onClose }) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && onClose) {
      onClose();
    }

    if (event.key === 'Backspace') {
      event.stopPropagation();
    }
  };

  return (
    <div className="input-block">
      <label className="input-label" htmlFor="input">
        {label}
      </label>
      <div className="input-control-block">
        <input
          className="input"
          id="input"
          value={value}
          onChange={onChangeHandler}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};
