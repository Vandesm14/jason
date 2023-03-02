import { Button } from '@blueprintjs/core';
import React from 'react';
import ReactJson from 'react-json-view';
import { flex } from '../compose/styles';

export interface QueryOutputProps {
  result: any;
}

export function QueryOutput({ result }: QueryOutputProps) {
  const [isTable, setIsTable] = React.useState(false);

  return (
    <>
      <ReactJson
        src={result}
        theme="google"
        displayDataTypes={false}
        displayObjectSize={false}
      />
      <div
        style={{
          ...flex.row,
          ...flex.center,
          position: 'relative',
        }}
      >
        <Button onClick={() => setIsTable((isTable) => !isTable)}>
          {isTable ? 'Table' : 'JSON'}
        </Button>
      </div>
    </>
  );
}
