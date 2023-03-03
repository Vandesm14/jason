import React from 'react';
import { search } from 'jmespath';
import { flex } from '../compose/styles';
import useLocalStorageState from 'use-local-storage-state';
import { Button } from '@blueprintjs/core';
import { HelpModal } from './HelpModal';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { useResizeDetector } from 'react-resize-detector';

interface QueryInputProps {
  onChange?: (result: object) => void;
  json?: object;
}

export function QueryInput({ onChange, json }: QueryInputProps) {
  const { height, ref } = useResizeDetector();
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
      ref={ref}
    >
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
      <CodeMirror
        value={query}
        onChange={(value) => {
          setQuery(value);
          handleSearch(json ?? {}, value);
        }}
        height={height ? `${height}px` : '100%'}
        placeholder="Use JMESPath to query your JSON"
        extensions={[javascript()]}
        theme={oneDark}
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
