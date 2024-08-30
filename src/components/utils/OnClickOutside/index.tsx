import React, { useEffect, useRef } from 'react';

export interface ClickOutsideCatcherProps {
  onClickOutside: () => void;
}

export const ClickOutsideCatcher: React.FC<React.PropsWithChildren<ClickOutsideCatcherProps>> = ({
  onClickOutside,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickOutside]);

  return <div ref={ref}>{children}</div>;
};
