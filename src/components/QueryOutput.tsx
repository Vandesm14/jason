import { Button, HTMLTable } from '@blueprintjs/core';
import React from 'react';
import ReactJson from 'react-json-view';
import { flex } from '../compose/styles';
import { Column, flattenJSON } from '../json';
import { Tooltip2 } from '@blueprintjs/popover2';
import { ColoredValue } from './ColoredValue';

export interface QueryOutputProps {
  result: any;
}

export function QueryOutput({ result }: QueryOutputProps) {
  const [isTable, setIsTable] = React.useState(false);
  const [table, setTable] = React.useState<Column[] | null>(null);

  React.useEffect(() => {
    try {
      if (!Array.isArray(result) || result.length === 0)
        throw new Error('Not an array');

      let newTable = flattenJSON(result);

      console.log(newTable);
      setTable(newTable);
    } catch {
      setTable(null);
    }
  }, [result]);

  return (
    <>
      {isTable && table ? (
        <HTMLTable
          style={{
            width: 'min-content',
          }}
        >
          <thead
            style={{
              position: 'sticky',
              backgroundColor: '#383E47',
            }}
          >
            <th></th>
            {table?.map((column) => (
              <th key={column.key}>{column.key}</th>
            ))}
          </thead>
          <tbody>
            {table?.[0].values.map((_, i) => (
              <tr>
                <td
                  style={{
                    backgroundColor: '#383E47',
                  }}
                  key={0}
                >
                  {i + 1}
                </td>
                {table?.map((column, itemIndex) => (
                  <td key={itemIndex + 1}>
                    <ColoredValue value={column.values[i]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </HTMLTable>
      ) : (
        <ReactJson
          src={result}
          theme="google"
          displayDataTypes={false}
          displayObjectSize={false}
        />
      )}
      <div
        style={{
          ...flex.row,
          ...flex.center,
          width: '100%',
        }}
      >
        <div>
          <Button onClick={() => setIsTable(false)} active={isTable}>
            JSON
          </Button>
          <Tooltip2
            content={
              table === null ? (
                <span>Result is not an array of objects</span>
              ) : undefined
            }
          >
            <Button
              onClick={() => setIsTable(true)}
              active={!isTable}
              disabled={table === null}
            >
              Table
            </Button>
          </Tooltip2>
        </div>
      </div>
    </>
  );
}
