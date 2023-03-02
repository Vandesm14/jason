import React from 'react';

interface JSONModalProps {
  onChange: (json: string) => void;
}

export function JSONModal({ onChange }: JSONModalProps) {
  const [json, setJson] = React.useState('');

  return (
    <textarea
      value={json}
      onChange={(e) => {
        setJson(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
}
