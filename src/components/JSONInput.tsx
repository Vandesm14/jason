import React from 'react';
import { Button, Text } from '@blueprintjs/core';
import useLocalStorageState from 'use-local-storage-state';
import { flex } from '../compose/styles';
import CodeMirror from '@uiw/react-codemirror';
import { json as jsonLang } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';

interface JSONInputProps {
  onChange: (json: string) => void;
  onSubmit: () => void;
}

export function JSONInput({ onChange, onSubmit }: JSONInputProps) {
  const [json, setJson] = useLocalStorageState('json', {
    defaultValue: '',
  });
  const [isValid, setIsValid] = React.useState(false);

  const handleJSONChange = (value: string) => {
    try {
      JSON.parse(value);
      setIsValid(true);
      return true;
    } catch (e: any) {
      setIsValid(false);
      console.error(e);
      return false;
    }
  };

  React.useEffect(() => {
    // If the value exists in local storage, use it
    handleJSONChange(json);
    onChange(json);
  }, []);

  return (
    <section>
      <CodeMirror
        value={json}
        onChange={(value) => {
          setJson(value);
          handleJSONChange(value);
        }}
        height="40vh"
        placeholder="Paste your JSON here"
        extensions={[jsonLang()]}
        theme={oneDark}
      />
      <div
        style={{
          ...flex.col,
          ...flex.center,
          gap: '1rem',
          padding: '1rem',
        }}
      >
        <Button
          intent="primary"
          text="Let's Go!"
          disabled={!isValid}
          onClick={() => {
            onChange(json);
            onSubmit();
          }}
          large={true}
          icon="build"
        />
        {isValid ? (
          <Text style={{ color: '#72CA9B' }}>Valid JSON</Text>
        ) : json.length > 0 ? (
          <Text style={{ color: '#FA999C' }}>Invalid JSON</Text>
        ) : null}
      </div>
    </section>
  );
}
