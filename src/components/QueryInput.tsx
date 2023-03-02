import React from 'react';
import { search } from 'jmespath';
import { flex } from '../compose/styles';
import useLocalStorageState from 'use-local-storage-state';

interface QueryInputProps {
  onChange?: (result: object) => void;
  json?: object;
}

export function QueryInput({ onChange, json }: QueryInputProps) {
  const [query, setQuery] = useLocalStorageState('query', {
    defaultValue: '*',
  });

  const handleSearch = (json: object, query: string) => {
    try {
      const result = search(json, query);
      onChange?.(result);
    } catch (e: any) {
      onChange?.({ 'Parse Error': e.message });
    }
  };

  React.useEffect(() => {
    // If the value exists in local storage, we can run the query
    handleSearch(json ?? {}, query);
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
          height: '10rem',
          resize: 'vertical',
        }}
      />
    </div>
  );
}
