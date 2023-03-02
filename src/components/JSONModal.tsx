import React from 'react';
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
  Text,
} from '@blueprintjs/core';
import useLocalStorageState from 'use-local-storage-state';

interface JSONModalProps {
  onChange: (json: string) => void;
}

export function JSONModal({ onChange }: JSONModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);
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
      setIsOpen(false);
      onChange(json);
    } else {
      setIsOpen(true);
    }
  }, []);

  return (
    <>
      <Dialog autoFocus enforceFocus title="Enter your JSON" isOpen={isOpen}>
        <DialogBody>
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
        </DialogBody>
        <DialogFooter
          actions={
            <Button
              intent="primary"
              text="Let's Go!"
              disabled={!isValid}
              onClick={() => {
                setIsOpen(false);
                onChange(json);
              }}
            />
          }
        >
          {isValid ? (
            <Text>Valid JSON</Text>
          ) : json.length > 0 ? (
            <Text>Invalid JSON</Text>
          ) : null}
        </DialogFooter>
      </Dialog>
      <Button onClick={() => setIsOpen(true)}>Open JSON Modal</Button>
    </>
  );
}
