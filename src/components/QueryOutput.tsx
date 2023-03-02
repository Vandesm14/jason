import { Button } from '@blueprintjs/core';
import React, { LegacyRef } from 'react';
import ReactJson from 'react-json-view';
import { flex } from '../compose/styles';

export interface QueryOutputProps {
  result: any;
}

export function QueryOutput({ result }: QueryOutputProps) {
  const buttonRef = React.useRef<HTMLDivElement>(null);
  const [isTable, setIsTable] = React.useState(false);

  const buttonHeight = buttonRef.current?.clientHeight ?? 0;

  return (
    <>
      {isTable ? null : (
        <ReactJson
          src={result}
          theme="google"
          displayDataTypes={false}
          displayObjectSize={false}
        />
      )}
      <div
        style={{
          position: 'relative',
        }}
      >
        <div
          style={{
            ...flex.row,
            ...flex.center,
            position: 'absolute',
            width: '100%',
            top: -buttonHeight - 10,
          }}
        >
          <div ref={buttonRef}>
            <Button onClick={() => setIsTable(false)} active={isTable}>
              JSON
            </Button>
            <Button onClick={() => setIsTable(true)} active={!isTable}>
              Table
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
