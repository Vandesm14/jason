import React from 'react';
import { search } from 'jmespath';
import { InputGroup } from '@blueprintjs/core';
import { flex } from '../compose/styles';

interface QueryInputProps {
  onChange?: (result: object) => void;
  json?: object;
}

export function QueryInput({ onChange, json }: QueryInputProps) {
  const [query, setQuery] = React.useState('*');

  const handleSearch = (json: object, query: string) => {
    try {
      const result = search(json, query);
      onChange?.(result);
    } catch (e: any) {
      onChange?.({ 'Parse Error': e.message });
    }
  };

  React.useEffect(() => {
    setQuery('*');
    handleSearch(json ?? {}, '*');
  }, [json]);

  return (
    <div
      style={{
        ...flex.col,
      }}
    >
      <textarea
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(json ?? {}, e.target.value);
        }}
        style={{
          width: '100%',
          height: '30rem',
          resize: 'vertical',
        }}
      />
    </div>
  );
}
