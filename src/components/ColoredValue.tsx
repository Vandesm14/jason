import React from 'react';

interface ColoredValueProps {
  value: any;
}

const green = '#72CA9B';
const red = '#E76A6E';
const orange = '#EC9A3C';
const blue = '#4C90F0';

const canBeNumber = (value: any) => {
  if (typeof value === 'number') return true;
  if (typeof value === 'string') return !isNaN(Number(value));
  return false;
};

export function ColoredValue({ value }: ColoredValueProps) {
  const color = React.useMemo(() => {
    if (typeof value === 'boolean') return blue;
    if (canBeNumber(value)) return green;
    if (typeof value === 'string') return orange;

    return 'white';
  }, [value]);

  const stringified = React.useMemo(() => {
    if (Array.isArray(value)) return JSON.stringify(value);
    if (typeof value === 'object') return JSON.stringify(value);
    return value;
  }, [value]);

  return <span style={{ color }}>{stringified}</span>;
}
