import React from 'react';
import { search } from 'jmespath';

interface QueryInputProps {
  onChange?: (result: object) => void;
  json?: object;
}

export function QueryInput({ onChange, json }: QueryInputProps) {
  const [query, setQuery] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSearch = (json: object, query: string) => {
    try {
      const result = search(json, query);
      onChange?.(result);
      setError('');
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(json ?? {}, e.target.value);
        }}
      />
      {error ? <div>{error}</div> : null}
    </>
  );
}
