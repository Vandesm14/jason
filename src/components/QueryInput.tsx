import React from 'react';
import { search } from 'jmespath';
import { flex } from '../compose/styles';
import useLocalStorageState from 'use-local-storage-state';
import { Button } from '@blueprintjs/core';
import { HelpModal } from './HelpModal';

interface QueryInputProps {
  onChange?: (result: object) => void;
  json?: object;
}

export function QueryInput({ onChange, json }: QueryInputProps) {
  const [showHelp, setShowHelp] = React.useState(false);
  const [query, setQuery] = useLocalStorageState('query', {
    defaultValue: '',
  });

  const handleSearch = (json: object, query: string) => {
    if (query === '') return onChange?.(json);

    try {
      // TODO: Use https://www.npmjs.com/package/@cloudelements/jmespath for adding custom functions
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
        width: '100%',
        height: '100%',
      }}
    >
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
      <textarea
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(json ?? {}, e.target.value);
        }}
        style={{
          width: '100%',
          height: '100%',
          resize: 'vertical',
          backgroundColor: '#252A31',
        }}
        placeholder="Use JMESPath to query your JSON"
      />
      <div
        style={{
          ...flex.row,
          ...flex.center,
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            zIndex: 100,
          }}
        >
          <Button onClick={() => setShowHelp(true)}>Help</Button>
        </div>
      </div>
    </div>
  );
}
