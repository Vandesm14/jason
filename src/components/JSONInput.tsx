import React from 'react';
import { Button, Text } from '@blueprintjs/core';
import useLocalStorageState from 'use-local-storage-state';
import { flex } from '../compose/styles';

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
    // If the value exists in local storage, we don't want to open the modal
    if (handleJSONChange(json)) {
      onChange(json);
    } else {
      onSubmit();
    }
  }, []);

  return (
    <section>
      <textarea
        value={json}
        onChange={(e) => {
          setJson(e.target.value);
          handleJSONChange(e.target.value);
        }}
        style={{
          width: '100%',
          height: '30rem',
          resize: 'none',
        }}
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
